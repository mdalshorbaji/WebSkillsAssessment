const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const users = {
  1: { id: 1, name: 'Lina', role: 'student', note: 'No flag here.' },
  2: { id: 2, name: 'Omar', role: 'student', note: 'Try another id.' },
  3: { id: 3, name: 'Admin', role: 'admin', note: 'flag{api_idor_found}' }
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'student' && password === 'web123') {
    return res.json({ ok: true, role: 'student', message: 'Logged in as student.' });
  }
  return res.json({ ok: false, message: 'Invalid credentials. But where is the real check happening?' });
});

app.get('/api/user', (req, res) => {
  const id = req.query.id || '1';
  const user = users[id];
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.get('/admin-panel', (req, res) => {
  res.send(`<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin Panel</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <main class="container">
    <section class="card danger">
      <h1>Restricted Administration Page</h1>
      <p>This page is accessible without proper server-side authorization.</p>
      <div class="flag">flag{broken_access_control}</div>
      <a href="/" class="btn">Back to Assessment</a>
    </section>
  </main>
</body>
</html>`);
});

app.get('/hidden-backup', (req, res) => {
  res.send(`<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hidden Backup</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <main class="container">
    <section class="card">
      <h1>Public Backup Page</h1>
      <p>This page represents a sensitive backup resource that should not be publicly accessible.</p>
      <div class="flag">flag{robots_revealed_secret}</div>
      <a href="/" class="btn">Back to Assessment</a>
    </section>
  </main>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Web CTF running at http://localhost:${PORT}`);
});
