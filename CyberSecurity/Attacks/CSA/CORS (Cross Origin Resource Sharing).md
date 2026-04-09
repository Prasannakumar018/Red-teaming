---
title: CORS (Cross Origin Resource Sharing)
---

**References:**
1) [[Necessary HTTP Headers]]
2) https://ejj.io/misconfigured-cors
3) https://fetch.spec.whatwg.org/#access-control-allow-origin-response-header
4) https://webhook.site/#!/view/1f11bb2b-0a9f-4933-8280-45f8f9d6a1d4
5) ![[exploitingcorsmisconfigurations.pdf]]



#### What is CORS? (Cross Origin Resource Sharing)

[Cross-Origin Resource Sharing](https://portswigger.net/web-security/cors) ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)) is a technology used by websites to make web browsers relax the Same Origin Policy, enabling cross-domain communication between different websites. It's frequently used by web APIs in particular, but in a modern complex website it can turn up anywhere. It’s widely understood that certain CORS configurations are dangerous, but some associated subtleties and implications are easily misunderstood. In this post I’ll show how to critically examine CORS configurations from a hacker’s perspective, and steal bitcoins.



![[Pasted image 20250717224352.png]]

#### CORS for hackers:

Websites enable CORS by sending the following HTTP response header:

-> `Access-Control-Allow-Origin: https://example.com`


**The `Access-Control-Allow-Origin` header is included in the response from one website to a request originating from another website, and identifies the permitted origin of the request. A web browser compares the Access-Control-Allow-Origin with the requesting website's origin and permits access to the response if they match.**

The server can enable credential transmission using the following header:

-> `Access-Control-Allow-Credentials: true`




# Same-origin policy (SOP)
The same-origin policy is a web browser security mechanism that aims to prevent websites from attacking each other.

The same-origin policy restricts scripts on one origin from accessing data from another origin. An origin consists of a URI scheme, domain and port number. For example, consider the following URL:
`http://normal-website.com/example/example.html`


**Example:**

![[Pasted image 20250717225754.png]]


# Pre-flight checks:

     The pre-flight check was added to the CORS specification to protect legacy resources from the expanded request options allowed by CORS. Under certain circumstances, when a cross-domain request includes a non-standard HTTP method or headers, the cross-origin request is preceded by a request using the `OPTIONS` method, and the CORS protocol necessitates an initial check on what methods and headers are permitted prior to allowing the cross-origin request. This is called the **pre-flight check**.



**CORS (Cross Origin Resource Sharing) has three variations:**

1) **Origin** header check eg; Origin: http://evil.com
2) **Null** in the origin eg; Origin: null
3) **XSS** via CORS **poor HTTP** eg: - `http://trusted-subdomain.vulnerable-website.com` **actual subdomain:** `http://trusted-subdomain.com`
