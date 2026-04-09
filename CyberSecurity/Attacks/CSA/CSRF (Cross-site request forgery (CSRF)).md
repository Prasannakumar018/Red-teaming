

## What is CSRF?
 
	 Cross-site request forgery (also known as CSRF) is a **web security vulnerability** that allows an attacker to induce users to perform actions that they do not intend to perform. It allows an attacker to partly circumvent the same origin policy, which is designed to prevent different websites from interfering with each other.

## What is the impact of a CSRF attack?

- Unauthorized fund transfers.
    
- Changing user emails or passwords.
    
- Deleting accounts.
    
- Anything the user can do, the attacker can force via CSRF.
    

---




For a CSRF attack to be possible, three key conditions must be in place:

- **A relevant action.** There is an action within the application that the attacker has a reason to induce. This might be a privileged action (such as modifying permissions for other users) or any action on user-specific data (such as changing the user's own password).
- **Cookie-based session handling.** Performing the action involves issuing one or more HTTP requests, and the application relies solely on session cookies to identify the user who has made the requests. There is no other mechanism in place for tracking sessions or validating user requests.
- **No unpredictable request parameters.** The requests that perform the action do not contain any parameters whose values the attacker cannot determine or guess. For example, when causing a user to change their password, the function is not vulnerable if an attacker needs to know the value of the existing password.

---

### **Conditions for CSRF:**

- Victim is **logged in** to a trusted site.
    
- Trusted site relies on **cookies for authentication**.
    
- Malicious site can trick the browser into sending a request.
    
- The trusted site does **not validate the origin or use CSRF tokens**.


### 🔐 **Preventing CSRF:**

1. **CSRF Tokens** (most common):
    
    - Server generates a random token.
        
    - Token is embedded in each form/request.
        
    - Server checks if the token matches.
        
    
    `<input type="hidden" name="csrf_token" value="random_token">`
    
2. **SameSite Cookies:**
    
    - Set cookies with `SameSite=Strict` or `SameSite=Lax`.
        
    - Prevents cookies from being sent with cross-site requests.
        
    
    `Set-Cookie: sessionid=abc123; SameSite=Strict; Secure`
    
3. **Double Submit Cookies:**
    
    - Send CSRF token as a cookie and in the request body.
        
    - Server checks both values match.
        
4. **Check Referer/Origin Header:**
    
    - Verify that requests come from the same origin.


---
# XSS vs CSRF

