export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { email, password, name, username } = await request.json();
    if (!email || !password || !username) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const id = crypto.randomUUID();
    
    // Check if email or username exists
    const existing = await env.DB.prepare("SELECT email FROM users WHERE email = ? OR username = ?").bind(email, username).first();
    if (existing) {
      return new Response(JSON.stringify({ error: "Email or username already exists" }), { status: 409 });
    }

    // In real app, hash the password
    await env.DB.prepare(
      "INSERT INTO users (id, email, password_hash, name, username, role) VALUES (?, ?, ?, ?, ?, 'user')"
    ).bind(id, email, password, name, username).run();

    // Mock Email Send
    console.log(`[MOCK EMAIL] To: ${email} | Subject: Welcome to Rabyte-Tech! | Body: Welcome ${name}, start selling today!`);

    return new Response(JSON.stringify({ success: true, message: "User registered successfully" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
