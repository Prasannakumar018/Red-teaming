
Authentication             --> Identifies users and confirms the identity
Session Management --> Once Authenticated , will be needed to access the other page as well, to make sure with the same user auth we use session.   **(Set-Cookie)**
Access Control            --> Checks with the Session and verifies the User Authenticity to perform the action



# Access Control Types:

- Vertical Access control 
-Accessing admin resources from user access control
- Horizontal Access control
-Accessing Other users resources from the same role
- Context-Dependent Access control
-Skipping the Step directly to the end process(Avoiding the Confirmation and Deletion the content) or (Directly accessing the success page of payment without the paying the amount)


# Broken Access Control:

- Horizontal Privilage Escalation
- Vertical Privilage Escalation
- Access control Vulnerability in Multi-step processes (Context-Dependent Access control)

### Other Access Control:

- Bypass access by changing the parameter in the URL or HTML page
- Accesing the API with the missing Access control
- Tampering JWT web Token or Cookies
- CORS misconfiguration 
- Force browsing 



**Impact of Access control Vulnerability:**
###### CIA traid issue:

	Confidentiality      : Access to other user's data 
	Integrity            : Access to update other user's data
	Availability         : Access to Delete user






Reference:

https://youtu.be/_jz5qFWhLcg?si=drwMlLNzqMaHhHUj

