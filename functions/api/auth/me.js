// Helper to parse cookies
function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, v] = c.split('=');
    return [k.trim(), decodeURIComponent(v)];
  }));
}

export async function onRequestGet(context) {
  const { request } = context;
  const cookies = parseCookies(request.headers.get("Cookie"));
  
  const token = cookies['session_token'];
  if (!token) {
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }

  try {
    // Decode our simple token payload
    const payloadStr = atob(token.split('.')[1]);
    const payload = JSON.parse(payloadStr);

    if (payload.exp < Date.now()) {
      return new Response(JSON.stringify({ user: null, error: "Expired token" }), { status: 401 });
    }

    return new Response(JSON.stringify({ user: payload }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }
}
