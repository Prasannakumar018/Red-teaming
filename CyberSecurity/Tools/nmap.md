
Nmap is a powerful network scanning tool with many options and flags. I'll provide a comprehensive overview starting from beginner-level commands to advanced usage, explaining the main options and their purposes.

---
If it is url then find the url using this 

`nslookup "example.com"`

### Beginner Level

- `nmap <target>`  
  Basic scan of a target IP or hostname. Scans the most common 1000 TCP ports.

- `nmap -v <target>`  
  Verbose output, shows more details during the scan.

- `nmap -sS <target>`  
  TCP SYN scan (stealth scan). Sends SYN packets and waits for responses without completing the TCP handshake.

- `nmap -p <port(s)> <target>`  
  Scan specific port(s). Example: `-p 22` or `-p 1-1000`.

- `nmap -O <target>`  
  Enable OS detection.

- `nmap -sV <target>`  
  Service version detection to identify software versions running on open ports.

---

### Intermediate Level

- `nmap -A <target>`  
  Aggressive scan: enables OS detection, version detection, script scanning, and traceroute.

- `nmap -Pn <target>`  
  Skip host discovery (treat all hosts as online). Useful if ping is blocked.

- `nmap -T<0-5> <target>`  
  Timing template to speed up or slow down scans. `-T0` is slowest (stealthy), `-T5` is fastest (noisy).

- `nmap -sU <target>`  
  UDP scan to check UDP ports.

- `nmap -6 <target>`  
  Scan IPv6 addresses.

- `nmap --script=<scriptname> <target>`  
  Run specific NSE (Nmap Scripting Engine) scripts. Example: `--script=http-title`.

- `nmap --top-ports <number> <target>`  
  Scan the top N most common ports.

---

### Advanced Level

- `nmap -sS -sU -p T:1-65535,U:1-65535 <target>`  
  Scan all TCP and UDP ports.

- `nmap --script vuln <target>`  
  Run vulnerability detection scripts.

- `nmap --script "default or safe" <target>`  
  Run default or safe scripts.

- `nmap --traceroute <target>`  
  Perform traceroute to the target.

- `nmap --reason <target>`  
  Show the reason why a port is in a particular state.

- `nmap --open <target>`  
  Show only open ports.

- `nmap --exclude <host1,host2>`  
  Exclude hosts from scanning.

- `nmap --max-retries <number>`  
  Set max number of port scan probe retransmissions.

- `nmap --max-rate <number>`  
  Limit the number of packets sent per second.

- `nmap --data-length <number>`  
  Append random data to sent packets to evade detection.

- `nmap --source-port <port>`  
  Use a specific source port.

- `nmap --spoof-mac <mac address or vendor>`  
  Spoof MAC address.

---

### Example Full Command (Advanced)

```bash
nmap -sS -sV -O -A -p 1-65535 --script vuln --max-retries 2 --max-rate 1000 --reason --open <target>
```

This command performs a stealth SYN scan, service and OS detection, aggressive scanning with vulnerability scripts, scans all ports, limits retries and rate, shows reasons for port states, and only shows open ports.

---
