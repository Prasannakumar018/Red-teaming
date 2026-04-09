
## **📁 Wordlists: Locations, Names, and Specializations**
| Wordlist Name / Path                                                   | Purpose / Use Case                           | Best Tool                   | Notes / Specialization                            |
| ---------------------------------------------------------------------- | -------------------------------------------- | --------------------------- | ------------------------------------------------- |
| `/usr/share/wordlists/dirb/common.txt`                                 | Directory & file brute-force (basic)         | `dirb`, `gobuster`          | Fast, small — for quick scans                     |
| `/usr/share/wordlists/dirbuster/directory-list-2.3-small.txt`          | Directory brute-force (moderate size)        | `gobuster`, `ffuf`          | Good balance between size and coverage            |
| `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`         | Deeper web directory scans                   | `ffuf`, `dirsearch`         | Slower, but more exhaustive                       |
| `/usr/share/wordlists/rockyou.txt` (extract it from .gz)               | Password brute-forcing                       | `hydra`, `john`, `medusa`   | Most famous for weak passwords                    |
| `/usr/share/seclists/Discovery/Web-Content/common.txt`                 | Web files & directories                      | `ffuf`, `gobuster`, `wfuzz` | Alternative to dirb’s common.txt                  |
| `/usr/share/seclists/Discovery/Web-Content/big.txt`                    | Large directory brute-force                  | `ffuf`, `dirsearch`         | Slower but can discover deeply nested paths       |
| `/usr/share/seclists/Discovery/Web-Content/raft-small-directories.txt` | RESTful APIs, small web apps                 | `ffuf`                      | Focuses on modern naming patterns (e.g., `/api/`) |
| `/usr/share/seclists/Discovery/Web-Content/raft-large-files.txt`       | Large file-based brute-force                 | `ffuf`, `gobuster`          | Good for static files like `.bak`, `.log`, etc.   |
| `/usr/share/seclists/Discovery/DNS/namelist.txt`                       | DNS subdomain brute-force                    | `dnsenum`, `dnsrecon`       | Used for DNS recon                                |
| `/usr/share/seclists/Usernames/top-usernames-shortlist.txt`            | Username bruteforce (small set)              | `hydra`, `burpsuite`        | Admin/user name guessing                          |
| `/usr/share/seclists/Passwords/Common-Credentials/10k-most-common.txt` | Password bruteforce                          | `hydra`, `medusa`           | Faster than `rockyou.txt`                         |
| `/usr/share/seclists/Fuzzing/` (many files)                            | Injection testing payloads (XSS, SQLi, etc.) | `wfuzz`, `burp`             | Use for parameter and header fuzzing              |
| `/usr/share/seclists/Web-Shells/`                                      | Uploadable shells                            | Manual                      | Use in upload/RCE exploits                        |


## 🧠 Summary by Use Case

### 🔍 Directory/File Discovery

| Use Case      | Recommended Wordlists                                |
| ------------- | ---------------------------------------------------- |
| Quick Scan    | `common.txt`, `directory-list-2.3-small.txt`         |
| Thorough Scan | `directory-list-2.3-medium.txt`, `big.txt`, `raft-*` |
| API endpoints | `raft-small-directories.txt`, `api.txt`              |
### 🔐 Password/User Brute Force

| Use Case          | Recommended Wordlists                      |
| ----------------- | ------------------------------------------ |
| Password cracking | `rockyou.txt`, `10k-most-common.txt`       |
| Username guessing | `top-usernames-shortlist.txt`, `names.txt` |

### 💣 Injection Testing / Fuzzing

| Use Case          | Recommended Wordlists                        |
| ----------------- | -------------------------------------------- |
| XSS               | `XSS.txt`, `xss-payload-list.txt`            |
| SQL Injection     | `SQLi.txt`, `sql-injection-payload-list.txt` |
| Command Injection | `cmd-injection-payload-list.txt`             |
| LFI/RFI           | `LFI.txt`, `rfi-payload-list.txt`            |

### 🌐 Subdomain / DNS

|Use Case|Recommended Wordlists|
|---|---|
|Subdomain bruteforce|`namelist.txt`, `subdomains-top1million.txt`|


## 📦 Tools + Wordlist Combos (Fast Reference)

| Tool        | Ideal Wordlist Examples                                              |
| ----------- | -------------------------------------------------------------------- |
| `dirb`      | `common.txt`                                                         |
| `gobuster`  | `directory-list-2.3-medium.txt`, `raft-large-files.txt`              |
| `ffuf`      | `common.txt`, `raft-small-directories.txt`, custom `FUZZ` payloads   |
| `hydra`     | `rockyou.txt`, `10k-most-common.txt`, `top-usernames.txt`            |
| `sqlmap`    | (automated payloads inside), but you can fuzz params with `SQLi.txt` |
| `burpsuite` | Use fuzzing lists from `/Fuzzing/` or `/Payloads/`                   |
| `wfuzz`     | `XSS.txt`, `cmd-injection-payload-list.txt`                          |
