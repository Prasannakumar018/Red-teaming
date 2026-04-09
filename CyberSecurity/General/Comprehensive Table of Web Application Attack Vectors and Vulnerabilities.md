
---------
 ![[Pasted image 20250701215504.png]]

| **Interaction Point** | **Attack Type**                       | **Why It Applies**                  | **Example(s)**              | **OWASP Top 10 (2021)** | **CWE ID**      | **Real CVE**   |
| --------------------- | ------------------------------------- | ----------------------------------- | --------------------------- | ----------------------- | --------------- | -------------- |
| **Text Input**        | XSS (Stored, Reflected, DOM)          | Input rendered without sanitization | `<script>alert(1)</script>` | A03 – Injection         | CWE-79          | CVE-2020-11022 |
|                       | SQL Injection                         | Input embedded in SQL queries       | `' OR 1=1 --`               | A03 – Injection         | CWE-89          | CVE-2019-12384 |
|                       | OS Command Injection                  | Input passed to shell commands      | `; whoami`                  | A03 – Injection         | CWE-78          | CVE-2021-41773 |
|                       | SSTI (Server-Side Template Injection) | Input rendered in template engines  | `{{7*7}}`                   | A03 – Injection         | CWE-1336        | CVE-2016-5003  |
|                       | NoSQL Injection                       | Query logic manipulation in NoSQL   | `{"$ne": null}`             | A03 – Injection         | CWE-943         | CVE-2019-10758 |
|                       | Log Injection / Forging               | Input written to logs unsanitized   | `admin\n[INFO] success`     | A09 – Logging Failures  | CWE-117         | N/A            |
|                       | LDAP Injection                        | Input used in LDAP search filters   | `_)(uid=_))(                | (uid=*`                 | A03 – Injection | CWE-90         |
|                       | XPath Injection                       | Input used in XPath queries         | `' or 1=1`                  | A03 – Injection         | CWE-91          | CVE-2021-32803 |


|**Interaction Point**|**Attack Type**|**Why It Applies**|**Example(s)**|**OWASP Top 10**|**CWE**|**CVE Example**|
|---|---|---|---|---|---|---|
|**File Upload**|Arbitrary File Upload / Web Shell|Weak file validation|`shell.php` as `image.jpg`|A01 – Broken Access Control|CWE-434|CVE-2019-6340|
||SVG XSS / XML Injection|SVG rendered without sanitization|`<svg><script>`|A03 – Injection|CWE-611, CWE-79|CVE-2018-14017|
||ImageMagick RCE|Malformed image executes code|`.mvg` or `.ps` file|A03 – Injection|CWE-77|CVE-2016-3714|
||EXIF Injection|EXIF metadata displayed unsafely|`<script>` in EXIF author|A03 – Injection|CWE-79|N/A|
||Zip Bomb / Image Bomb|Decompression causes DoS|`42.zip`|A06 – Vulnerable Components|CWE-409|N/A|
||Path Traversal|File path manipulated by user|`../../../../shell.php`|A05 – Misconfiguration|CWE-22|CVE-2020-17519|




|**Interaction Point**|**Attack Type**|**Why It Applies**|**Example(s)**|**OWASP Top 10 (2021)**|**CWE ID**|**CVE Example**|
|---|---|---|---|---|---|---|
|**URL / Query Parameters**|Open Redirect|Redirect parameter unvalidated|`?redirect=http://evil.com`|A01 – Broken Access Control|CWE-601|CVE-2020-5260|
||SSRF|Server fetches URL from user input|`?url=http://localhost`|A10 – SSRF|CWE-918|CVE-2021-21985|
||LFI / RFI|File inclusion via parameter|`?file=../../etc/passwd`|A03 – Injection|CWE-98, CWE-94|CVE-2021-41773|
||HTTP Parameter Pollution|Duplicate parameters alter logic|`?id=1&id=2`|A03 – Injection|CWE-235|N/A|
||Reflected / DOM XSS|Query param echoed into DOM|`?q=<script>`|A03 – Injection|CWE-79|CVE-2019-5418|



| Category                            | Attack Type                   | Vulnerability Description / Trigger Context                                            | Common Trigger Examples                                                            | OWASP Top 10 (2021) | CWE ID           | Notable CVE (Example) |
| ----------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------- | ---------------- | --------------------- |
| **Authentication / Session**        | Brute Force                   | No rate limit or CAPTCHA on login attempts                                             | Repeated login attempts                                                            | A07                 | CWE-307          | N/A                   |
|                                     | Credential Stuffing           | Reused credentials from data breaches are not detected/prevented                       | Using known credentials in login attempts                                          | A07                 | CWE-798          | N/A                   |
|                                     | Session Hijacking             | Session ID leaked, predictable, or transmitted insecurely                              | Cookie theft or reuse, sniffing unencrypted traffic                                | A07                 | CWE-384          | N/A                   |
|                                     | Session Fixation              | Session ID is reused after successful login, allowing an attacker to set the SID       | Attacker sets session ID before user logs in, then it's reused                     | A07                 | CWE-384          | N/A                   |
|                                     | IDOR (BOLA)                   | Object access not validated on the server-side                                         | `GET /order?id=1234` (changing the ID to access other users' data)                 | A01                 | CWE-639          | CVE-2021-21300        |
|                                     | Privilege Escalation          | Elevated role or access via crafted request due to misconfiguration or logical flaw    | Sending `{"role":"admin"}` in a user profile update                                | A05                 | CWE-269          | CVE-2021-22986        |
| **API / Web Services**              | Mass Assignment               | Input allows modification of protected fields or unintended properties                 | `{"isAdmin":true}` sent in a user update request                                   | A05                 | CWE-915          | CVE-2020-26295        |
|                                     | Excessive Data Exposure       | API returns sensitive fields to unauthorized parties                                   | Password hash returned in a public user profile response                           | A03                 | CWE-200          | CVE-21-32648          |
|                                     | Broken Function-Level Auth    | Privileged actions lack proper authorization checks                                    | Regular user calling an admin-only API endpoint to delete a user                   | A01                 | CWE-285          | CVE-2021-21300        |
|                                     | Rate Limiting Bypass          | API does not sufficiently throttle requests                                            | Flooding a login endpoint with requests                                            | A04                 | CWE-770          | N/A                   |
|                                     | GraphQL Introspection         | Schema definition is visible in production environments, providing attack surface info | Using `__schema` query to retrieve the API schema                                  | A06                 | CWE-200          | N/A                   |
|                                     | GraphQL Query DoS             | Deeply nested or complex queries exhaust server resources                              | Crafting deeply nested fragments                                                   | A08                 | CWE-400          | N/A                   |
| **Network Interaction**             | CSRF                          | No CSRF token validation to prevent cross-site request forgery                         | Malicious `<img>` tag pointing to sensitive action (e.g., `<img src="/transfer">`) | A01                 | CWE-352          | CVE-2018-1000525      |
|                                     | MITM                          | Traffic intercepted over unencrypted HTTP or via network manipulation                  | Stealing login credentials on an open Wi-Fi network                                | A02                 | CWE-311          | N/A                   |
|                                     | Session Hijacking (Network)   | Session token sniffed from unencrypted network traffic                                 | Cookie stolen on open Wi-Fi                                                        | A07                 | CWE-384          | N/A                   |
|                                     | DoS / DDoS                    | Malformed or high-volume requests overwhelm server resources                           | SYN Flood, Slowloris attacks                                                       | A06                 | CWE-400          | N/A                   |
| **Error Handling / Logs**           | Information Disclosure        | Stack trace, internal paths, or credentials displayed in error messages                | Database error shows secrets like username/password                                | A06                 | CWE-209          | CVE-2020-17453        |
|                                     | Log Forging                   | Unsanitized user input is injected into log files                                      | Injecting newline characters like `\nadmin login OK` into a username field         | A09                 | CWE-117          | N/A                   |
| **Serialization / Deserialization** | Insecure Deserialization      | Crafted serialized object leads to arbitrary code execution                            | Malicious Java `ObjectInputStream` payload                                         | A08                 | CWE-502          | CVE-2015-4852         |
|                                     | WhatsApp Voice Call RCE       | Binary deserialization vulnerability in specific application context                   | Exploitation of CVE-2019-3568 (Pegasus) through a voice call                       | A08                 | CWE-787, CWE-502 | CVE-2019-3568         |
|                                     | Python Pickle Injection       | Deserializing untrusted data using `pickle.loads()`                                    | Exploiting Flask session cookies to achieve RCE                                    | A08                 | CWE-502          | N/A                   |
|                                     | ViewState Exploitation (.NET) | ViewState MAC missing or weak, allowing injected state data to be processed            | Tampering with ViewState to bypass validation or execute code                      | A08                 | CWE-502          | CVE-2017-11317        |
| **Miscellaneous**                   | Host Header Injection         | Unvalidated `Host` header used in application logic                                    | `Host: evil.com` to poison web cache or reset links                                | A05                 | CWE-641          | CVE-2021-32791        |
|                                     | Race Condition                | Timing flaw between concurrent actions allowing manipulation                           | Rapidly performing a double transfer of funds                                      | A01                 | CWE-362          | CVE-2021-36740        |
|                                     | Clickjacking                  | UI redress via iframe due to missing security headers                                  | Hidden iframe overlaying a legitimate button                                       | A05                 | CWE-1021         | CVE-2021-32027        |
|                                     | Web Cache Poisoning           | Cache reflects malicious input due to unvalidated headers/parameters                   | Poisoned URL cached for all users                                                  | A06                 | CWE-113          | CVE-2021-22876        |
|                                     | Subdomain Takeover            | DNS points to unclaimed cloud asset or external service                                | Hijacking `s3.example.com` when the S3 bucket is deleted                           | A05                 | CWE-400          | N/A                   |

