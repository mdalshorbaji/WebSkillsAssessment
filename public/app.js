const loginForm = document.querySelector('#loginForm');
const loginResult = document.querySelector('#loginResult');

// Bad idea: never put security decisions or secret flags in frontend code.
const frontendOnlyAdminToken = 'flag{frontend_auth_is_not_security}';
const adminPage = '/admin-panel';

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  if (username === 'admin' && password === 'admin') {
    loginResult.textContent = `Frontend-only admin bypass found: ${frontendOnlyAdminToken}`;
    return;
  }

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  loginResult.textContent = JSON.stringify(await res.json(), null, 2);
});

const commentInput = document.querySelector('#commentInput');
const commentBtn = document.querySelector('#commentBtn');
const comments = document.querySelector('#comments');

window.alert = new Proxy(window.alert, {
  apply(target, thisArg, args) {
    const text = String(args[0] || '').toLowerCase();
    if (text.includes('ctf')) {
      const flag = document.createElement('div');
      flag.className = 'flag';
      flag.textContent = 'flag{xss_output_encoding_missing}';
      comments.appendChild(flag);
    }
    return Reflect.apply(target, thisArg, args);
  }
});

commentBtn.addEventListener('click', () => {
  const value = commentInput.value;
  // Vulnerable on purpose for the CTF: innerHTML renders user input as HTML.
  comments.innerHTML += `<div class="comment">${value}</div>`;
  commentInput.value = '';
});

const loadUser = document.querySelector('#loadUser');
const userResult = document.querySelector('#userResult');

loadUser.addEventListener('click', async () => {
  const res = await fetch('/api/user?id=1');
  userResult.textContent = JSON.stringify(await res.json(), null, 2);
});

console.log('Developer note: admin page is', adminPage);
