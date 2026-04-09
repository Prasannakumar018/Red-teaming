**A04:2021-Insecure Design** is a new category for 2021, with a focus on risks related to design flaws.   
If we genuinely want to "move left" as an industry, it calls for more use of threat modeling, secure design patterns and principles, and reference architectures.


![Pasted image 20250728193228.png](app://8c664618666df04392d764bf34f20df6f406/Users/I578057/Documents/Obsidian%20Vault/Random/Pasted%20image%2020250728193228.png?1753711348256)



**Encoding is not encryption**
### Symmetric Encryption (Same key for encryption and decryption)

1. **AES (Advanced Encryption Standard)**
    
    - Widely used, strong, and efficient.
        
    - Key sizes: 128, 192, or 256 bits.
        
2. **DES (Data Encryption Standard)**
    
    - Older standard, now mostly obsolete due to short key length (56 bits).
        
    - Replaced by AES.
        
3. **3DES (Triple DES)**
    
    - Applies DES encryption three times to increase security.
        
    - Slower but more secure than DES.
        
4. **Blowfish**
    
    - Fast, flexible block cipher with variable key length (32 to 448 bits).
        
5. **RC4**
    
    - Stream cipher, used historically in protocols like SSL/TLS but now considered insecure.
        

---

### Asymmetric Encryption (Uses public and private key pairs)

1. **RSA**
    
    - Based on factorization of large numbers.
        
    - Common for secure key exchange and digital signatures.
        
2. **ECC (Elliptic Curve Cryptography)**
    
    - Uses elliptic curves over finite fields.
        
    - Offers similar security to RSA but with smaller key sizes.
        
3. **DSA (Digital Signature Algorithm)**
    
    - Mainly for digital signatures, often paired with SHA hashing.
        

---

### Hash Functions (One-way encryption, mainly for data integrity)

- **SHA-256**
    
- **MD5** (now insecure)
    
- **SHA-3**


---------------------
### Common Encoding Methods:

1. **Base64**
    
    - Encodes binary data into ASCII characters.
        
    - Commonly used to embed images in emails or HTML, or to transmit data over text-based protocols.
        
2. **ASCII (American Standard Code for Information Interchange)**
    
    - Represents text characters as numbers (0–127).
        
    - The basis for most text encoding.
        
3. **UTF-8 (Unicode Transformation Format - 8-bit)**
    
    - Encodes Unicode characters using 1 to 4 bytes.
        
    - Supports virtually all characters from all languages.
        
4. **URL Encoding (Percent Encoding)**
    
    - Encodes special characters in URLs to be safely transmitted over the web.
        
    - For example, spaces become `%20`.
        
5. **Hexadecimal Encoding (Hex)**
    
    - Represents binary data as hexadecimal digits (0-9, A-F).
        
    - Often used in debugging or representing binary in a readable way.
        
6. **Base32**
    
    - Similar to Base64 but uses a smaller character set (A-Z, 2-7).
        
    - Used in applications like QR codes or certain encoding protocols.
        
7. **Morse Code**
    
    - Encodes characters as sequences of dots and dashes for telecommunication.