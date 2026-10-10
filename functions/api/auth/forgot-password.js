export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { email } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }

    const user = await env.DB.prepare("SELECT id, name FROM users WHERE email = ?").bind(email).first();
    if (user) {
      // Generate a temporary 6-character password
      const tempPass = Math.random().toString(36).slice(-6).toUpperCase();
      
      // Update DB with temporary password and flag
      await env.DB.prepare("UPDATE users SET password_hash = ?, needs_password_reset = 1 WHERE email = ?").bind(tempPass, email).run();
      
      // Mock Email Send
      console.log(`[MOCK EMAIL] To: ${email} | Subject: Password Reset Request | Body: Hi ${user.name}, your temporary password is: ${tempPass}. Please login and change it immediately.`);
    }

    // We always return success to prevent email enumeration
    return new Response(JSON.stringify({ success: true, message: "If an account exists, an email was sent." }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
