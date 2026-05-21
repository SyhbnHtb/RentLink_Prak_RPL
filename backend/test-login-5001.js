async function run() {
  try {
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@rentlink.com', password: 'wrong_password' })
    });
    const text = await res.text();
    console.log('Status:', res.status, 'Body:', text);
  } catch (e) {
    console.error('Login error:', e.message);
  }
}
run();
