export async function onRequestGet(context) {
  const { env } = context;
  try {
    // Fetch active products from D1
    const { results } = await env.DB.prepare(
      "SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC LIMIT 20"
    ).all();

    // Map DB fields to frontend format
    const products = results.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category_id || "Uncategorized",
      price: p.source_currency === 'USD' ? `$${p.source_price}` : `${p.source_price}`,
      rating: p.source_rating || "5.0",
      reviews: p.source_review_count || 0,
      image: `/images/products/saas-ui-kit.svg`, // Placeholder since we don't have images in DB yet
      seller: "Rabyte Creator",
      source: p.source_platform,
      badge: p.id === 'p_1' ? "Trending" : ""
    }));

    return new Response(JSON.stringify({ products }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, products: [] }), { status: 500 });
  }
}
