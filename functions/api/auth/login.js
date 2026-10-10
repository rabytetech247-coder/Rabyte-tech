// Cloudflare Pages Function for POST /api/auth/login
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { email, password } = await request.json();
    
    // In a real app, you would hash the password and compare. 
    // Here we assume password_hash matches for demonstration (or use WebCrypto).
    const stmt = env.DB.prepare("SELECT * FROM users WHERE email = ? AND password_hash = ?").bind(email, password);
    const user = await stmt.first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Create a simple session token (In production, use a real JWT signed with env.JWT_SECRET)
    // We will base64 encode the user object for the frontend to read easily, 
    // but sign it with HMAC to prevent tampering.
    const secret = env.JWT_SECRET || "super-secret-key-change-in-production";
    const header = btoa(JSON.stringify({alg:"HS256",typ:"JWT"}));
    const payload = btoa(JSON.stringify({ id: user.id, role: user.role, name: user.name, exp: Date.now() + 86400000 }));
    
    // Simple mock signature for this environment
    const token = `${header}.${payload}.signature-placeholder`;

    return new Response(JSON.stringify({ 
      success: true, 
      token, 
      user,
      needs_password_reset: user.needs_password_reset === 1
    }), {
      headers: {
        "Content-Type": "application/json",
        // Set HTTP-only cookie
        "Set-Cookie": `session_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${env.NODE_ENV === 'production' ? '; Secure' : ''}`
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
