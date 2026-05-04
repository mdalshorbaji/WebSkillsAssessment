# Teacher Solutions - Web Security CTF

## Level 1: Inspection

Flag:

```text
flag{inspect_html_comment}
```

How:
Open DevTools → Elements or View Source. The flag is inside an HTML comment in `index.html`.

Security lesson:
Do not place secrets in client-side HTML comments.

Fix:
Remove sensitive data from frontend files.

---

## Level 2: Login Logic

Flag:

```text
flag{frontend_auth_is_not_security}
```

How:
Inspect `public/app.js`. It contains a frontend-only check:

```js
if (username === 'admin' && password === 'admin')
```

Entering admin/admin reveals the flag.

Security lesson:
Frontend checks are not authentication. Users can read and modify frontend code.

Fix:
Perform authentication and authorization on the server. Never expose secret tokens in JavaScript.

---

## Level 3: XSS Playground

Flag:

```text
flag{xss_output_encoding_missing}
```

How:
Submit a payload that triggers alert with the word `ctf`, for example:

```html
<img src=x onerror="alert('ctf')">
```

Security lesson:
User input is inserted using `innerHTML`, allowing HTML/JS execution.

Fix:
Use `textContent` for untrusted input, sanitize user input, and apply output encoding.

---

## Level 4: API Exploration

Flag:

```text
flag{api_idor_found}
```

How:
Click `Load My Profile`, observe request:

```text
/api/user?id=1
```

Change the id to 3:

```text
/api/user?id=3
```

Security lesson:
This is an IDOR / broken object level authorization issue.

Fix:
Check on the server that the authenticated user is allowed to access the requested object.

---

## Level 5: Access Control

Flag:

```text
flag{broken_access_control}
```

How:
Find `/admin-panel` inside `app.js` or browser console logs, then open:

```text
http://localhost:3000/admin-panel
```

Security lesson:
Hiding a URL is not access control.

Fix:
Protect admin routes on the server using proper authorization middleware.

---

## Level 6: Hidden Content

Flag:

```text
flag{robots_revealed_secret}
```

How:
Open:

```text
http://localhost:3000/robots.txt
```

It reveals:

```text
Disallow: /hidden-backup
```

Then open `/hidden-backup`.

Security lesson:
`robots.txt` is public and should not reveal sensitive backup paths.

Fix:
Do not deploy sensitive backups. Protect private routes with authentication or remove them.
