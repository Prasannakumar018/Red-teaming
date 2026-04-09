
**Reference:**
* Ec-council course


### **Why Nessus?**

**Nessus** is a tool developed by Tenable that scans **computers, networks, and systems** for known **vulnerabilities**. It helps identify:

- Unpatched software
    
- Misconfigurations
    
- Weak passwords
    
- Open ports and services
    
- Missing security updates
    

It's mostly used in **passive reconnaissance** and **vulnerability assessment** phases of penetration testing.


## How Nessus Is Used in Penetration Testing

### 1. **Reconnaissance Phase**

Before using Nessus, a pentester typically uses tools like `nmap` to map out the network and find active hosts and open ports.

Example:

bash

CopyEdit

`nmap -sS -T4 -A 192.168.1.0/24`

Then, the IPs found can be scanned with Nessus.

---

### 2. **Vulnerability Scanning**

This is where Nessus shines. You:

- Set up a **new scan** in Nessus
    
- Choose the type (e.g., Basic Network Scan, Advanced Scan, Web App Scan)
    
- Input target IP addresses or ranges
    
- Launch the scan
    

Nessus will identify known vulnerabilities (CVEs), show their severity (Critical, High, Medium, etc.), and often provide remediation steps.

---

### 3. **Report Generation**

After the scan:

- Nessus provides detailed reports in HTML, PDF, or CSV.
    
- Reports include CVEs, descriptions, affected systems, and recommended fixes.
    
- These reports are often submitted to clients or used to plan exploitation (if allowed by the engagement rules).
    

---

### 4. **Integration in Pentesting Workflow**

While Nessus doesn’t exploit vulnerabilities (that’s tools like Metasploit), it helps you **prioritize** what to attack.

For example:

- Nessus shows an open SMB share with weak permissions → You exploit it manually or with Metasploit.
    
- Nessus reports outdated Apache version with known RCE → Try the exploit manually or script it.



## **Vulnerablity Analysis and Scanning**



