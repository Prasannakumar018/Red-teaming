

### **Vulnerability testing**

If you have identified technologies, test for:

- XSS
    
- SQLi
    
- LFI/RFI
    
- SSRF
    
- Authentication bypasses
    
- IDOR

**Tool**: `nuclei -l live-200.txt -tags xss,sqli,lfi,rce`


### **Check for Subdomain Takeover (A01:2021 - Broken Access Control)**

Even if the subdomain returns 200, it could be hosted on an unclaimed service.

**Tool:** `subjack`, `nuclei`, or `tko-subs`

### **Check for sensitive data exposure (A02:2021)**

Look for:

- `.env` files
    
- `.git/config`
    
- `/backup.zip`
    
- Exposed API keys
**Tool:**
`curl -s https://sub.example.com/.env`
`curl -s https://sub.example.com/.git/config`

(or)

`nuclei -l live-200.txt -t exposed-tokens`



### **Directory/File fuzzing (A04:2021 - Insecure Design)**

Discover hidden endpoints, admin panels, APIs, or debug paths.

**Tool:**
```
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u https://sub.example.com/FUZZ -o ffuf-results.json
```

### **Check for misconfigurations (A05:2021)**

Run passive and active misconfig checks.

**Use Nuclei (fast and powerful):**
**Tool:**
`nuclei -l live-200.txt -t cves,misconfiguration,exposed-panels`

### **Authentication & Session Handling (A07:2021)**

If any login panels are exposed, test for:

- Weak credentials (admin/admin)
    
- Brute-force protections
    
- Token-based auth weaknesses (JWT analysis)
    
- Missing rate limiting