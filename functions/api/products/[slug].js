export async function onRequestGet(context) {
  const { env, params } = context;
  const productSlug = params.slug;

  try {
    const product = await env.DB.prepare(
      "SELECT p.*, u.name as seller_name, u.avatar_url, u.trust_score FROM products p JOIN users u ON p.seller_id = u.id WHERE p.slug = ?"
    ).bind(productSlug).first();

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    // Format for frontend
    const data = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      description: product.description,
      price: product.source_currency === 'USD' ? `$${product.source_price}` : `${product.source_price}`,
      rating: product.source_rating || "5.0",
      reviews: product.source_review_count || 0,
      image: `/images/products/saas-ui-kit.svg`, // Placeholder
      source: product.source_platform,
      source_url: product.source_url,
      seller: {
        name: product.seller_name,
        trust_score: product.trust_score,
        avatar: product.avatar_url || "U"
      }
    };

    return new Response(JSON.stringify({ product: data }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
