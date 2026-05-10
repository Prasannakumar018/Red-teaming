---
layout: home
title: Home
---

# Red Teaming Guide

A comprehensive, community-driven guide for red teaming and penetration testing. From fundamentals to advanced exploitation techniques.

---

<div class="roadmap">
<div class="roadmap-title">Learning Path</div>
<div class="roadmap-track">

<div class="roadmap-level">
<div class="roadmap-dot roadmap-dot--beginner">1</div>
<div class="roadmap-level-title roadmap-level-title--beginner">Beginner - Foundations</div>
<div class="roadmap-items">
<a class="roadmap-item" href="{{ '/CyberSecurity/General/Terminologies' | relative_url }}">Terminologies</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/owasp 10' | relative_url }}">OWASP Top 10</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/General/Cookies' | relative_url }}">Cookies</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/General/Necessary HTTP Headers' | relative_url }}">HTTP Headers</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/General/Encoding and Decoding' | relative_url }}">Encoding & Decoding</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/General/Enumeration' | relative_url }}">Enumeration</a>
</div>
</div>

<div class="roadmap-level">
<div class="roadmap-dot roadmap-dot--intermediate">2</div>
<div class="roadmap-level-title roadmap-level-title--intermediate">Intermediate - Core Attacks</div>
<div class="roadmap-items">
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/SQL Injection (SQLi)' | relative_url }}">SQL Injection</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/CSA/Cross-site scripting' | relative_url }}">XSS</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/CSA/CSRF (Cross-site request forgery (CSRF))' | relative_url }}">CSRF</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/CSA/CORS (Cross Origin Resource Sharing)' | relative_url }}">CORS</a>
<a class="roadmap-item" href="{{ '/Common Attacks Listings/Insecure Direct Object Reference' | relative_url }}">IDOR</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/Authentication' | relative_url }}">Authentication</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/Broken Access Control' | relative_url }}">Access Control</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/OS command Injection' | relative_url }}">Command Injection</a>
</div>
</div>

<div class="roadmap-level">
<div class="roadmap-dot roadmap-dot--advanced">3</div>
<div class="roadmap-level-title roadmap-level-title--advanced">Advanced - Exploitation</div>
<div class="roadmap-items">
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/JWT attacks' | relative_url }}">JWT Attacks</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/GraphQL API vulnerabilities' | relative_url }}">GraphQL</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Attacks/SSA/NoSQL injection' | relative_url }}">NoSQL Injection</a>
<a class="roadmap-item" href="{{ '/Common Attacks Listings/RCE(Remote Code Execution)' | relative_url }}">RCE</a>
<a class="roadmap-item" href="{{ '/Common Attacks Listings/Reverse Shell' | relative_url }}">Reverse Shell</a>
<a class="roadmap-item" href="{{ '/writeups/02_direct_prompt_injection' | relative_url }}">AI/LLM Security</a>
</div>
</div>

<div class="roadmap-level">
<div class="roadmap-dot roadmap-dot--practice">4</div>
<div class="roadmap-level-title roadmap-level-title--practice">Practice & Tools</div>
<div class="roadmap-items">
<a class="roadmap-item" href="{{ '/CyberSecurity/Tools/nmap' | relative_url }}">Nmap</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Tools/Metasploit' | relative_url }}">Metasploit</a>
<a class="roadmap-item" href="{{ '/CyberSecurity/Tools/Nessus' | relative_url }}">Nessus</a>
<a class="roadmap-item" href="{{ '/Learnings from CTF's/Pico CTF' | relative_url }}">PicoCTF</a>
<a class="roadmap-item" href="{{ '/Learnings from CTF's/Tryhackme' | relative_url }}">TryHackMe</a>
<a class="roadmap-item" href="{{ '/Learnings from CTF's/hackinghub' | relative_url }}">HackingHub</a>
</div>
</div>

</div>
</div>

---

<div class="topic-grid">

<div class="topic-card">
<div class="topic-card-title">Server-Side Attacks</div>
<div class="topic-card-count">8 articles</div>
<div class="topic-card-desc">SQL Injection, NoSQL, Command Injection, Authentication, JWT, GraphQL, API Testing</div>
</div>

<div class="topic-card">
<div class="topic-card-title">Client-Side Attacks</div>
<div class="topic-card-count">4 articles</div>
<div class="topic-card-desc">XSS, CSRF, CORS misconfiguration, Clickjacking</div>
</div>

<div class="topic-card">
<div class="topic-card-title">Real-World Writeups</div>
<div class="topic-card-count">4 articles</div>
<div class="topic-card-desc">Auth bypass, SSRF, Prompt Injection, RCE via sandbox escape</div>
</div>

<div class="topic-card">
<div class="topic-card-title">Language-Specific</div>
<div class="topic-card-count">4 articles</div>
<div class="topic-card-desc">Java, Node.js, Python, PHP attack patterns</div>
</div>

<div class="topic-card">
<div class="topic-card-title">Security Tools</div>
<div class="topic-card-count">5 articles</div>
<div class="topic-card-desc">Nmap, Metasploit, Nessus, Google Dorking, Subdomain enumeration</div>
</div>

<div class="topic-card">
<div class="topic-card-title">CTF Solutions</div>
<div class="topic-card-count">3 platforms</div>
<div class="topic-card-desc">PicoCTF, TryHackMe, HackingHub walkthroughs</div>
</div>

</div>

---

## All Topics

### Server-Side Attacks

- [SQL Injection (SQLi)](CyberSecurity/Attacks/SSA/SQL%20Injection%20(SQLi))
- [NoSQL Injection](CyberSecurity/Attacks/SSA/NoSQL%20injection)
- [OS Command Injection](CyberSecurity/Attacks/SSA/OS%20command%20Injection)
- [Authentication](CyberSecurity/Attacks/SSA/Authentication)
- [Broken Access Control](CyberSecurity/Attacks/SSA/Broken%20Access%20Control)
- [JWT Attacks](CyberSecurity/Attacks/SSA/JWT%20attacks)
- [GraphQL API Vulnerabilities](CyberSecurity/Attacks/SSA/GraphQL%20API%20vulnerabilities)
- [API Testing](CyberSecurity/Attacks/SSA/API%20TESTING)

### Client-Side Attacks

- [Cross-Site Scripting (XSS)](CyberSecurity/Attacks/CSA/Cross-site%20scripting)
- [CSRF](CyberSecurity/Attacks/CSA/CSRF%20(Cross-site%20request%20forgery%20(CSRF)))
- [CORS Misconfiguration](CyberSecurity/Attacks/CSA/CORS%20(Cross%20Origin%20Resource%20Sharing))
- [Clickjacking](CyberSecurity/Attacks/CSA/Clickjacking%20(UI%20redressing))

### General Security

- [OWASP Top 10](CyberSecurity/owasp%2010)
- [Red Teaming Overview](CyberSecurity/RED%20TEAMING)
- [Cryptographic Failures](CyberSecurity/General/CRYPTOGRAPHIC%20FAILURES)
- [Cookies](CyberSecurity/General/Cookies)
- [Encoding & Decoding](CyberSecurity/General/Encoding%20and%20Decoding)
- [HTTP Headers](CyberSecurity/General/Necessary%20HTTP%20Headers)
- [Insecure Design](CyberSecurity/General/Insecure%20Design)
- [Vulnerable Components](CyberSecurity/General/Vulnerable%20and%20Outdated%20Components)
- [Attack Vectors Table](CyberSecurity/General/Comprehensive%20Table%20of%20Web%20Application%20Attack%20Vectors%20and%20Vulnerabilities)

### Attacks by Language

- [Java](Attacks%20based%20on%20Language/Java)
- [Node.js](Attacks%20based%20on%20Language/Node.js)
- [Python](Attacks%20based%20on%20Language/Python)
- [PHP](Attacks%20based%20on%20Language/php)

### Common Techniques

- [IDOR](Common%20Attacks%20Listings/Insecure%20Direct%20Object%20Reference)
- [RCE (Remote Code Execution)](Common%20Attacks%20Listings/RCE(Remote%20Code%20Execution))
- [Reverse Shell](Common%20Attacks%20Listings/Reverse%20Shell)

### Tools

- [Nmap](CyberSecurity/Tools/nmap)
- [Metasploit](CyberSecurity/Tools/Metasploit)
- [Nessus](CyberSecurity/Tools/Nessus)
- [Google Dorking](CyberSecurity/Tools/Google%20dorking)
- [Subdomain Enumeration](CyberSecurity/Tools/Subdomain%20findings)

### CTF Writeups

- [PicoCTF](Learnings%20from%20CTF's/Pico%20CTF)
- [TryHackMe](Learnings%20from%20CTF's/Tryhackme)
- [HackingHub](Learnings%20from%20CTF's/hackinghub)

### Real-World Writeups

- [Auth Bypass to SSRF via JWT Parsing Flaw](writeups/01_auth_bypass_to_ssrf)
- [Direct Prompt Injection in Document AI](writeups/02_direct_prompt_injection)
- [Indirect Prompt Injection: Weaponizing Documents](writeups/03_indirect_prompt_injection)
- [RCE via GraalVM Polyglot Sandbox Escape](writeups/04_rce_graalvm_polyglot)

### Resources

- [Payloads & Wordlists](Payloads%20Path)
