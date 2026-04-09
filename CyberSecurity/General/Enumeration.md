1. **Brute‑forcing directories**


🌐 Using **dirb**

`dirb example.com /usr/share/wordlists/dirb/common.txt`


### 🚀 Using **gobuster**
gobuster dir -u http://verbal-sleep.picoctf.net:52452/ -w /usr/share/wordlists/dirb/common.txt


⚡ Using **ffuf**
ffuf -u http://verbal-sleep.picoctf.net:52452/FUZZ -w /usr/share/wordlists/dirb/common.txt






2. **Fingerprinting the web tech stack**


❓ Using **whatweb**
whatweb http://verbal-sleep.picoctf.net:52452/

🚧 Using **nikto**
nikto -h http://verbal-sleep.picoctf.net:52452/
























MORE TO DEVELOP:

**Full Web Enum Bash Script**
#!/bin/bash

# Title: Web Enum Scanner
# Usage: ./web_enum.sh http://target:port/

`if [ -z "$1" ]; then`
  `echo "Usage: $0 <URL>"`
  `echo "Example: $0 http://example.com:8080/"`
  `exit 1`
`fi`

`TARGET="$1"`
`WORDLIST="/usr/share/wordlists/dirb/common.txt"`

`echo -e "\n🌐 Target: $TARGET"`
`echo "📅 Scan started: $(date)"`
`echo "----------------------------------------"`

`# 1. Ping check`
`echo -e "\n🔍 Checking if host is reachable..."`
`HOST=$(echo "$TARGET" | awk -F[/:] '{print $4}')`
`ping -c 2 "$HOST" > /dev/null 2>&1 && echo "✅ Host is reachable." || echo "⚠️ Host is not responding to ping."`

`# 2. whatweb scan`
`echo -e "\n🧠 Running whatweb..."`
`whatweb "$TARGET"`

`# 3. gobuster scan`
`echo -e "\n📁 Running directory brute-force with gobuster..."`
`gobuster dir -u "$TARGET" -w "$WORDLIST" -t 30 -q -o gobuster_results.txt`

`echo "➡️  Gobuster Results:"`
`cat gobuster_results.txt | grep -v "Status: 404"`

`# 4. nikto scan`
`echo -e "\n🛡️  Running nikto vulnerability scan..."`
`nikto -h "$TARGET"`

`echo -e "\n✅ Enumeration Complete: $(date)"`
`echo "----------------------------------------"`
