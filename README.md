# Red Teaming Guide

[![GitHub Pages](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-blue?style=flat-square)](https://prasannakumar018.github.io/Red-teaming)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey?style=flat-square)](LICENSE)
[![License: MIT](https://img.shields.io/badge/Code-MIT-green?style=flat-square)](LICENSE-CODE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

> A comprehensive, community-driven red teaming and penetration testing guide. From beginner to advanced. One resource for all pentesters.

## Live Site

**[prasannakumar018.github.io/Red-teaming](https://prasannakumar018.github.io/Red-teaming)**

## What's Inside

| Category | Topics |
|----------|--------|
| **Server-Side Attacks** | SQL Injection, NoSQL Injection, Command Injection, Authentication, JWT, GraphQL, API Testing |
| **Client-Side Attacks** | XSS, CSRF, CORS, Clickjacking |
| **General Security** | OWASP Top 10, Cryptographic Failures, HTTP Headers, Insecure Design |
| **Language-Specific** | Java, Node.js, Python, PHP vulnerabilities |
| **Tools** | Nmap, Metasploit, Nessus, Google Dorking, Subdomain Enumeration |
| **CTF Writeups** | PicoCTF, TryHackMe, HackingHub |
| **Real-World Writeups** | Auth Bypass, SSRF, Prompt Injection, RCE |

## Contributing

We welcome contributions from the community! Whether you want to:

- Add new attack technique guides
- Write CTF solutions
- Share real-world vulnerability writeups
- Fix typos or improve existing content
- Add tools and cheat sheets

Read the [Contributing Guide](CONTRIBUTING.md) to get started.

## Running Locally

```bash
# Clone the repo
git clone https://github.com/Prasannakumar018/Red-teaming.git
cd Red-teaming

# Install dependencies
gem install bundler jekyll
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000/Red-teaming/
```

## Project Structure

```
├── CyberSecurity/          # Main content
│   ├── Attacks/SSA/        # Server-side attacks
│   ├── Attacks/CSA/        # Client-side attacks
│   ├── General/            # General security topics
│   └── Tools/              # Tool guides
├── writeups/               # Real-world vulnerability writeups
├── Learnings from CTF's/   # CTF platform solutions
├── Common Attacks Listings/# Common attack patterns
├── Attacks based on Language/ # Language-specific vulns
├── _layouts/               # Jekyll layouts
├── _data/navigation.yml    # Sidebar navigation
├── assets/                 # CSS and JS
└── _templates/             # Content template for contributors
```

## Content Roadmap

Planned sections (contributions welcome):

- [ ] Network Pentesting (TCP/IP, pivoting, tunneling)
- [ ] Active Directory Attacks (Kerberoasting, Pass-the-Hash)
- [ ] Cloud Security (AWS/Azure/GCP misconfigurations)
- [ ] Mobile Security (Android/iOS testing)
- [ ] Privilege Escalation (Linux/Windows)
- [ ] Social Engineering
- [ ] Malware Analysis
- [ ] Wireless Attacks
- [ ] Bug Bounty Methodology

## License

- **Content** (markdown files): [CC BY-SA 4.0](LICENSE)
- **Code** (CSS, JS, HTML): [MIT](LICENSE-CODE)

## Acknowledgments

Built and maintained by [@Prasannakumar018](https://github.com/Prasannakumar018) and [contributors](https://github.com/Prasannakumar018/Red-teaming/graphs/contributors).
