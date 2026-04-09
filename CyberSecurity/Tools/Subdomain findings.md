| Tool            | Purpose                    | When to Use                                                                                     |
| --------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| **Sublist3r**   | Subdomain enumeration      | Quick scan of subdomains                                                                        |
| **Amass**       | Advanced subdomain enum    | Deep scans, passive & active recon                                                              |
| **Assetfinder** | Subdomain discovery        | Fast and lightweight recon                                                                      |
| **crt.sh**      | Certificate transparency   | Find subdomains from public SSL certs                                                           |
| **Gobuster**    | Directory/path brute-force | When looking for hidden paths on a web server                                                   |
| **Dirsearch**   | Web path enumeration       | To find admin panels, APIs, or hidden folders                                                   |
| **Nmap**        | Network scanning           | Port scanning, service version discovery                                                        |
| **Waybackurls** | Archive recon              | Find past URLs from Wayback Machine                                                             |
| **Waymore**     | Archive recon              | It’s also for pulling archived URLs, but less widely used or documented compared to Waybackurls |
### 💡 When to Use What:

- **Finding subdomains**: Use **Amass**, **Sublist3r**, **Assetfinder**, **crt.sh**
    
- **Finding hidden paths/files**: Use **Gobuster**, **Dirsearch**
    
- **Discovering old endpoints**: Use **Waybackurls**
    
- **Network-level scanning**: Use **Nmap**




### **🔐 Web Payload Injection Points**

| Location                         | Use Case                                 | Payload Types                             | When to Use                                          |
| -------------------------------- | ---------------------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `URL Path` (`/FUZZ`)             | Discover hidden directories/files        | Wordlists (e.g. `common.txt`)             | During recon (`ffuf`, `gobuster`, `dirb`)            |
| `Query Parameters` (`?id=1`)     | Test for LFI, SQLi, XSS, etc.            | SQLi, LFI, XSS, command injection         | Dynamic URLs, search pages, filters                  |
| `POST Body` (`username=admin`)   | Form submissions                         | SQLi, XSS, Auth bypass, SSRF              | Login, contact forms, search                         |
| `HTTP Headers`                   | SSRF, Host header attacks, cache poison  | Malicious `Host`, `X-Forwarded-For`, etc. | APIs, reverse proxies, weird behavior                |
| `Cookies`                        | Auth bypass, logic flaws, session hijack | `is_admin=true`, JWT tampering            | Login/session-based apps                             |
| `Referer` / `User-Agent` headers | XSS, SSRF, logging manipulation          | Script tags, injection payloads           | Log analysis, SSRF targets                           |
| `File Uploads`                   | RCE via file execution                   | `.php`, `.jsp`, `.svg` payloads           | Upload fields — test with web shells                 |
| `HTML Input Fields`              | XSS, validation bypass                   | `<script>`, event handlers                | Any form field in the frontend                       |
| `JavaScript Inputs`              | DOM XSS, client-side logic abuse         | Malicious JS                              | When source shows `eval()`, `document.write()`, etc. |
| `Local Storage / SessionStorage` | DOM-based storage                        | XSS payloads                              | Frontend-heavy apps like React, Angular              |
| `WebSockets / JSON API`          | Logic flaws, injections                  | JSON injection, script tags               | Real-time or modern JS apps                          |
| `Hidden Fields` in forms         | Parameter tampering                      | Elevated role values                      | Forms that send hidden user levels, IDs, prices      |
| `XML Input`                      | XXE (XML External Entity)                | `<!ENTITY ...>` payloads                  | SOAP APIs, XML-based services                        |
| `Command Line / System Calls`    | RCE, command injection                   | `; whoami`, `&& ls`                       | Apps that call system binaries                       |


## ⚙️ Tool Reference by Location

| Tool                             | Best For                                       |
| -------------------------------- | ---------------------------------------------- |
| `ffuf`, `dirb`, `gobuster`       | Brute-forcing paths and directories (`/FUZZ`)  |
| `sqlmap`                         | SQL injection (GET, POST, cookies)             |
| `burpsuite`                      | All-purpose: header tampering, request replays |
| `wfuzz`                          | Parameter fuzzing, advanced header injections  |
| `XSStrike`                       | Cross-site scripting (XSS) fuzzing             |
| `nmap + NSE`                     | Header and service-based vulnerabilities       |
| `nikto`                          | Basic web vuln discovery                       |
| `jwt-tool`                       | JWT tampering                                  |
| `wfuzz`, `ffuf`, `Burp Intruder` | Brute-forcing headers, parameters, forms       |


## ⚙️ Tools and uses

| Task                         | Tool(s)             |
| ---------------------------- | ------------------- |
| Fingerprint tech stack       | **whatweb, nmap**       |
| Discover hidden endpoints    | **ffuf, dirsearch**     |
| Check subdomain takeover     | **subjack, nuclei**     |
| Scan for CVEs and misconfigs | **nuclei**              |
| Find sensitive files         | **curl, nuclei, ffuf**  |
| Crawl and enumerate params   | **ParamSpider, Burp**   |
| Manual vulnerability testing | **Burp Suite, browser** |

|Tool|Best for|
|---|---|
|**Nuclei**|Fast, customizable vulnerability scanning for web apps, APIs, misconfigs, CVEs|
|**Nessus**|Comprehensive network scanning, compliance checks, vulnerability assessment across full infra (web, OS, DB, etc.)|