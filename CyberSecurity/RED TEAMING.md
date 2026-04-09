[[$Server Side Attacks]] AND [[$Client Side Attacks]] along with the [[Learnings from CTF's]] , to know about [[Terminologies]]

[[owasp 10]]
Stages of Penetration Testing:

1. Planning and Reconnaissance (Subdomain finding)
2. Scanning and Enumeration
3. Gaining Access
4. Maintain Access
5. Clearing Tracks
6. Reporting

---

### 🧠 1. **Planning and Reconnaissance**

Objective: Understand the target and gather preliminary information.

“What did enumeration give me access to — and can I weaponize that with known CVEs or misconfig?”
#### Steps:

- **Define scope and goals**
    
    - Assets in scope
        
    - Legal permissions
        
- **Identify target systems & services**
    
    - IP ranges, domains, cloud environments
        
- **Passive Reconnaissance**
    
    - WHOIS, DNS records
        
    - Google dorking, public data leaks
        
- **Subdomain Enumeration** 🔍
    
    - Tools: `Sublist3r`, `Amass`, `Assetfinder`, `crt.sh`
        
    - Validate with DNS resolution
        
- **Open Source Intelligence (OSINT)**
    
    - Employee names, exposed credentials, social engineering angles
        
- **Technology Stack Fingerprinting**
    
    - Detect WAFs, CMS, frameworks
        

---

### 🔎 2. **Scanning and Enumeration**

Objective: Actively gather data on live systems and potential vulnerabilities.

#### Steps:

- **Port Scanning**
    
    - Tools: `Nmap`, `Masscan`
        
    - Identify open ports/services
        
- **Service Version Detection**
    
    - Detect software versions, banners
        
- **Vulnerability Scanning**
    
    - Tools: `Nessus`, `OpenVAS`, `Nikto`, `Nuclei`
        
    - Cross-reference with CVEs
        
- **Enumeration**
    
    - SMB shares, SNMP data, LDAP, NetBIOS
        
    - Enumerate users, shares, software configs
        
- **Web Enumeration**
    
    - Hidden directories (`Dirbuster`, `Gobuster`)
        
    - CMS plugins/themes
        
- **Brute Forcing**
    
    - Passwords, usernames (`Hydra`, `Medusa`, `Patator`)
        

---

### 🎯 3. **Gaining Access**

Objective: Exploit vulnerabilities to obtain unauthorized access.

#### Steps:

- **Exploit Selection**
    
    - Based on CVEs, misconfigurations, weak passwords
        
    - Check for public exploits (`Exploit-DB`, `Metasploit`)
        
- **Custom Exploit Development**
    
    - If needed, develop tailored payloads
        
- **Web Exploits**
    
    - SQLi, XSS, RCE, SSRF
        
- **Network Exploits**
    
    - SMB relay, RDP vulns, unpatched services
        
- **Client-Side Attacks**
    
    - Phishing, malicious attachments
        
- **Privilege Escalation**
    
    - Kernel exploits, misconfigured services, token stealing
        
- **Payload Delivery**
    
    - Using reverse shells, web shells, or bind shells
        

---

### 🛡️ 4. **Maintaining Access**

Objective: Create persistence on the system to retain access.

#### Steps:

- **Backdoors/Reverse Shells**
    
    - Use Netcat, custom shells, scheduled tasks
        
- **Create Hidden User Accounts**
    
- **Trojans and Malware**
    
    - Drop persistent malicious files
        
- **Credential Dumping**
    
    - Tools: `Mimikatz`, `LaZagne`, `secretsdump.py`
        
- **SSH key installation / RDP access setup**
    
- **Modify Registry/Startup Scripts** (Windows)
    
- **Establish C2 (Command and Control) Communication**
    

---

### 🧽 5. **Clearing Tracks**

Objective: Erase evidence to avoid detection.

#### Steps:

- **Clear Shell History**
    
- **Remove Logs**
    
    - System logs, authentication logs
        
    - Tools: `logwiper`, manual cleanup
        
- **Delete Dropped Files and Scripts**
    
- **Cover Persistence Mechanisms**
    
- **Wipe Tools and Payloads**
    
- **Timestamp Alteration**
    
    - Touch command, timestomping
        

---

### 📋 6. **Reporting**

Objective: Document findings and provide actionable recommendations.

#### Steps:

- **Executive Summary**
    
    - Business impact, high-level insights
        
- **Technical Details**
    
    - Each vulnerability found, PoC screenshots
        
- **Attack Path Mapping**
    
    - How initial access led to further compromise
        
- **Risk Rating**
    
    - CVSS score, likelihood, and impact
        
- **Remediation Guidance**
    
    - Patch links, secure configurations
        
- **Appendices**
    
    - Tool output, raw data, command logs
        
- **Debrief with Stakeholders**
    
    - Presentation of findings
        

---


Automation is the **"Key"** :

Automation in the **Development** is as important as automation in **Security** , 

Dev + Operation + Automation = DevOps







# Automation in **Security** are,

1. **SubDomain** finder --> Subfinder, AssetFinder, Amass

![[Pasted image 20250509102315.png]]

2. **PortScanning**    --> Namp and Masscan
![[Pasted image 20250509102634.png]]

 3. **Screenshot** for SubDomains --> Eyewitness and aquatone
![[Pasted image 20250509102914.png]]

4. **Directory** findings --> FFuf and gobuster
![[Pasted image 20250509103045.png]]

5. **JavaScript** Analysis --> Linkfinder, gf
![[Pasted image 20250509103214.png]]

6. Automation of **Parameter discovery**--> Arjun, Spider
![[Pasted image 20250509105013.png]]

7. Automaion **XSS** --> dalfox,XSStrike
![[Pasted image 20250509105139.png]]

8. Automate **SQL Injection** testing--> Sqlmap
![[Pasted image 20250509105307.png]]

9. **SSRF** automation --> Gopherus, interactsh (Redis, Mysql and other Servers)
![[Pasted image 20250509111714.png]]


10. Automating **LFI** (Local File Inclusion) and **RFI**(Remote File Inclusion) detection--> lfisuite, fimap
![[Pasted image 20250509112053.png]]

11. Automate **Open Redirect Detection** -->(Phishing, Session Hijacking , unathorized access) Oralyzer
![[Pasted image 20250509112255.png]]


12. Automating **Security Headers** check --> Nikto, Httpx-Toolkit
![[Pasted image 20250509112405.png]]


13. Automating **API** recon --> Postman, KiteRunner
![[Pasted image 20250509112552.png]]


14. Automating **Content Discovery** --> gau, waybackUrls
![[Pasted image 20250509112703.png]]


15. Automating **S3 bucket enumeration** --> AWSBucketDump
![[Pasted image 20250509112816.png]]

16. Automating **CMS(Content Management System) enumeration** -->(wordpress, Joomla, Drupal) CMSeek
![[Pasted image 20250509113115.png]]


17. Automating **WAF detection** --> WAFOOF
![[Pasted image 20250509113246.png]]


18. Automating **Information Disclosure Detection** --> git-dumper
![[Pasted image 20250509113404.png]]


19. Automating **Reverse Shell** Generation --> MSFvenom(Metaspolit)
![[Pasted image 20250509113523.png]]


20. Automating **Mass Exploitation with Metaspolit** -->Metasploit
![[Pasted image 20250509113625.png]]








### 🔍 **1. Reconnaissance & Discovery**

These tools help you gather information about the target environment.

- **Nmap** – For port scanning, service/version detection, and basic scripting (NSE scripts).
    
- **Amass** – Great for subdomain enumeration.
    
- **Sublist3r** – Fast passive subdomain enumeration.
    
- **theHarvester** – Gathers emails, subdomains, IPs from public sources.
    
- **Shodan** – Search engine for Internet-connected devices; can give insights into exposed services and vulnerabilities.
    

---

### 🌐 **2. Web Application Scanning**

To find common vulnerabilities and weak configurations.

- **Burp Suite Pro** – Industry standard for web app testing. Excellent scanner, repeater, intruder, and extensions (BApp store).
    
- **OWASP ZAP** – Free alternative to Burp; has automated scanning and scripting capabilities.
    
- **Nikto** – Command-line web server scanner for outdated software and misconfigurations.
    
- **Arachni** – Advanced web scanner (discontinued but still usable); covers injection, session issues, etc.
    
- **Wapiti** – Lightweight command-line vulnerability scanner for web apps.
    

---

### 🧪 **3. Manual Testing & Exploitation**

These tools help when you're diving deep into vulnerabilities.

- **SQLMap** – Automated SQL injection and database takeover tool.
    
- **XSStrike** – XSS detection and payload generator (more intelligent than basic scanners).
    
- **Commix** – For Command Injection vulnerabilities.
    
- **WFuzz** / **FFUF** – For fuzzing URL parameters, hidden files, or directories.
    
- **Postman** – Great for testing APIs, especially RESTful ones.
    
- **JWT.io Debugger** – For analyzing JSON Web Tokens in auth systems.
    
- **HackTools (Burp/ZAP Extension)** – Quick access to payloads and common exploits.
    

---

### 🔐 **4. Authentication & Session Testing**

Check how the app handles login, sessions, and role-based access.

- **Cookie Editor** browser extension – Modify cookies manually.
    
- **Autorize (Burp Extension)** – Detect IDOR and access control flaws.
    
- **AuthMatrix (Burp Extension)** – Test complex authorization schemes.
    

---

### 📱 **5. API Testing**

For applications with mobile or SPA frontends that use APIs.

- **Postman** – For manually crafting and testing API requests.
    
- **Burp Suite** – Intercepts and modifies API calls made by frontend apps.
    
- **Insomnia** – A clean, modern alternative to Postman.
    

---

### 🧰 **6. Framework-Specific or CMS Tools**

Useful if you know the app uses a particular tech stack.

- **WPScan** – For WordPress security scanning.
    
- **JoomScan** – For Joomla.
    
- **Droopescan** – For Drupal.
    
- **CMSmap** – Multiplatform CMS vulnerability scanner.
    

---

### 🧯 **7. Reporting and Management**

Document findings and manage test results.

- **Dradis** – Collaboration and reporting platform for pentest teams.
    
- **Serpico** – Lightweight reporting tool for security assessments.
    
- **Faraday** – Centralized vulnerability management and collaboration.
    

---

### 🔄 Example Workflow with Nessus:

1. **Nessus + Nmap** for network-level vulnerabilities and misconfigurations.
    
2. **Burp Suite + ZAP** for in-depth application logic testing.
    
3. **SQLMap + XSStrike + Commix** for targeted injection flaws.
    
4. **WFuzz + Dirsearch** for hidden endpoints and brute-forcing.
    
5. **Postman + JWT tools** for API and auth testing.





**Disclaimer:**
Pentesting finding bug is like a **"gold rush"** , we may ended up with nothing or with a **"critical bug hunt"** 