#### previously known as **_"Sensitive Data Exposure"_**


"Cryptographic failures" can occur on **either the client side or the server side**, depending on where the cryptographic operations are taking place and where the vulnerability exists.
Eg., https://cisomag.com/instagram-data-breach-49-million-users-sensitive-data-exposed-online/
### 1. **Server-Side Cryptographic Failures**

These are more common and critical because the server usually handles most cryptographic tasks.

**Examples:**

- Misconfigured TLS/SSL (e.g. using outdated protocols like TLS 1.0)
    
- Weak or broken encryption algorithms (e.g. using MD5 or RC4)
    
- Improper key management (e.g. hardcoded or exposed private keys)
    
- Lack of encryption for sensitive data at rest (e.g. plaintext database passwords)
    
- Server does not verify certificate chains properly (e.g. skipping validation)
    

---

### 2. **Client-Side Cryptographic Failures**

Less common, but still important — especially in mobile apps, browsers, or desktop software.

**Examples:**

- Mobile app storing data without encryption
    
- Client not validating the server's TLS certificate (susceptible to MITM)
    
- Using weak or custom cryptography in JavaScript
    
- Exposing secrets or keys in frontend code
