// Helper to parse cookies
function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, v] = c.split('=');
    return [k.trim(), decodeURIComponent(v)];
  }));
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const cookies = parseCookies(request.headers.get("Cookie"));
  const token = cookies['session_token'];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;
    
    const { newPassword } = await request.json();
    if (!newPassword || newPassword.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), { status: 400 });
    }

    // Update password and clear the reset flag
    await env.DB.prepare("UPDATE users SET password_hash = ?, needs_password_reset = 0 WHERE id = ?").bind(newPassword, userId).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
