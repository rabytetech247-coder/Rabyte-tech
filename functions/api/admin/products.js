function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, v] = c.split('=');
    return [k.trim(), decodeURIComponent(v)];
  }));
}

async function verifyAdmin(request) {
  const cookies = parseCookies(request.headers.get("Cookie"));
  const token = cookies['session_token'];
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin' || payload.exp < Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const admin = await verifyAdmin(request);
  if (!admin) return new Response("Unauthorized", { status: 401 });

  try {
    const { results } = await env.DB.prepare("SELECT * FROM products WHERE status = 'pending'").all();
    return new Response(JSON.stringify({ products: results }), { headers: { "Content-Type": "application/json" }});
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const admin = await verifyAdmin(request);
  if (!admin) return new Response("Unauthorized", { status: 401 });

  try {
    const { productId, action } = await request.json();
    if (!productId || !action) return new Response("Missing data", { status: 400 });

    const product = await env.DB.prepare("SELECT * FROM products WHERE id = ?").bind(productId).first();
    if (!product) return new Response("Product not found", { status: 404 });

    if (action === "approve") {
      await env.DB.prepare("UPDATE products SET status = 'active' WHERE id = ?").bind(productId).run();
      await env.DB.prepare("UPDATE users SET trust_score = trust_score + 5 WHERE id = ?").bind(product.seller_id).run();
    } else if (action === "reject") {
      await env.DB.prepare("UPDATE products SET status = 'rejected' WHERE id = ?").bind(productId).run();
      await env.DB.prepare("UPDATE users SET trust_score = trust_score - 10 WHERE id = ?").bind(product.seller_id).run();
    }

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" }});
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
