---
title: API TESTING
---


-> API testing is important as vulnerabilities in APIs

Under API testing we have two:
1) REST [API TESTING](../../../CyberSecurity/Attacks/SSA/API%20TESTING)
2) [GraphQL API vulnerabilities](../../../CyberSecurity/Attacks/SSA/GraphQL%20API%20vulnerabilities)



**STEPS:**
1) Identify API endpoints
```
you should find out information about the following:
- The input data the API processes, including both compulsory and optional parameters.
- The types of requests the API accepts, including supported HTTP methods and media formats.
- Rate limits and authentication mechanisms.
```
2)  Look for endpoints that may refer to API documentation, 
    for example:
	- `/api`
	- `/swagger/index.html`
	- `/openapi.json`
3) If you identify the resource endpoint `/api/swagger/v1/users/123`, then you should investigate the following paths:

	- `/api/swagger/v1`
	- `/api/swagger`
	- `/api`
	- /api-docs
4) Use [JS Link Finder](https://portswigger.net/bappstore/0e61c786db0c4ac787a08c4516d52ccf) and [OpenAPI Parser](https://portswigger.net/bappstore/6bf7574b632847faaaa4eb5e42f1757c) from the burp suite, [Content type converter](https://portswigger.net/bappstore/db57ecbe2cb7446292a94aa6181c9278) for type conversion.
5) Mass assignment (also known as auto-binding) can inadvertently create hidden parameters. It occurs when software frameworks automatically bind request parameters to fields on an internal object. Mass assignment may therefore result in the application supporting parameters that were never intended to be processed by the developer.



# Server-side parameter pollution


Ultimately we have to mainly focus on the error message from the server,

This vulnerability is sometimes called HTTP parameter pollution. However, this term is also used to refer to a web application firewall (WAF) bypass technique.

1)  Truncating query strings: You can use a URL-encoded `#` character to attempt to truncate the server-side request. To help you interpret the response, you could also add a string after the `#` character.
2) Injecting invalid parameters: You can use an URL-encoded `&` character to attempt to add a second parameter to the server-side request.
3) Injecting valid parameters : If you're able to modify the query string, you can then attempt to add a second valid parameter to the server-side request
4) Overriding existing parameters:To confirm whether the application is vulnerable to server-side parameter pollution, you could try to override the original parameter. Do this by injecting a second parameter with the same name.
5) 







## Preventing vulnerabilities in APIs

When designing APIs, make sure that security is a consideration from the beginning. In particular, make sure that you:

- Secure your documentation if you don't intend your API to be publicly accessible.
- Ensure your documentation is kept up to date so that legitimate testers have full visibility of the API's attack surface.
- Apply an allowlist of permitted HTTP methods.
- Validate that the content type is expected for each request or response.
- Use generic error messages to avoid giving away information that may be useful for an attacker.
- Use protective measures on all versions of your API, not just the current production version.

To prevent mass assignment vulnerabilities, allowlist the properties that can be updated by the user, and blocklist sensitive properties that shouldn't be updated by the user.








