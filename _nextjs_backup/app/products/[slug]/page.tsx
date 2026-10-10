import PageShell from "@/components/PageShell";
import Icon from "@/components/Icon";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ReviewForm from "./ReviewForm";
import AnalyticsTracker from "./AnalyticsTracker";
import OutboundLink from "./OutboundLink";

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getDb();
  
  const product = await db.prepare("SELECT title, description, canonical_url, source_url FROM products WHERE slug = ? AND status = 'active'").bind(slug).first<any>();
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Rabyte-Tech`,
    description: product.description || `Discover ${product.title} on Rabyte-Tech.`,
    alternates: {
      canonical: product.canonical_url || `https://rabyte.tech/products/${slug}`
    },
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
    }
  };
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getDb();
  
  // Fetch product and seller
  const product = await db.prepare(`
    SELECT p.*, u.username as seller_username, u.name as seller_name, c.name as category_name
    FROM products p
    JOIN users u ON p.seller_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ? AND p.status = 'active'
  `).bind(slug).first<any>();

  if (!product) return notFound();

  // Fetch images
  const images = (await db.prepare("SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order ASC").bind(product.id).all()).results || [];
  const primaryImage = (images[0]?.r2_key as string | undefined) || "https://placehold.co/600x400?text=No+Image";

  // Fetch reviews
  const reviews = (await db.prepare(`
    SELECT r.*, u.name as reviewer_name, u.username as reviewer_username
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ? AND r.status = 'published'
    ORDER BY r.created_at DESC
  `).bind(product.id).all()).results || [];

  const internalRating = reviews.length > 0 ? (reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length).toFixed(1) : product.source_rating || "0.0";
  const internalReviews = reviews.length > 0 ? reviews.length : product.source_review_count || 0;

  const user = await getCurrentUser();

  return (
    <PageShell>
      <AnalyticsTracker productId={product.id} />
      
      <section className="section container">
        <div className="detail-grid">
          <div>
            <img className="detail-image" src={primaryImage} alt={product.title} />
          </div>
          <div>
            <small className="eyebrow">{product.category_name || "Uncategorized"} &middot; {product.source_platform}</small>
            <h1>{product.title}</h1>
            <p className="detail-lead">{product.description}</p>
            <div className="rating big">
              <Icon name="star" size={17} /> {internalRating} <span>({internalReviews} reviews)</span>
            </div>
            {product.source_price !== null && <div className="price">{product.source_currency === "USD" ? "$" : ""}{product.source_price}</div>}
            
            <div className="notice" style={{marginTop: 20}}>
              This platform is a discovery directory. Checkout and product delivery happen on the seller's external page.
            </div>
            
            <OutboundLink href={product.source_url} productId={product.id} className="button" style={{marginTop: 15, display: "inline-block"}}>
              Visit seller / Get product &rarr;
            </OutboundLink>

            <div className="seller-box" style={{marginTop: 30}}>
              <b>Seller</b>
              <Link href={`/seller/${product.seller_username}`}>{product.seller_name || product.seller_username}</Link>
              <small>Public seller profile</small>
            </div>
          </div>
        </div>
        
        <div className="content-card" style={{marginTop: 40}}>
          <h2>About this product</h2>
          <p>{product.description}</p>
        </div>

        <div className="content-card" style={{marginTop: 20}}>
          <h2>Community Reviews</h2>
          {reviews.length === 0 ? (
            <p style={{color: "#666"}}>No reviews on Rabyte-Tech yet. Be the first!</p>
          ) : (
            <div style={{display: "flex", flexDirection: "column", gap: 15, marginTop: 15}}>
              {reviews.map((r: any) => (
                <div key={r.id} style={{borderBottom: "1px solid var(--bd)", paddingBottom: 15}}>
                  <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 5}}>
                    <b style={{fontSize: 14}}>{r.reviewer_name || r.reviewer_username}</b>
                    <span style={{color: "#ffc107", fontSize: 13}}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  <p style={{margin: 0, fontSize: 14, color: "#333"}}>{r.review_text}</p>
                </div>
              ))}
            </div>
          )}

          {user && user.id !== product.seller_id ? (
            <ReviewForm productId={product.id} />
          ) : (
            !user && <p style={{marginTop: 20}}><Link href="/login" style={{color: "var(--blue)", textDecoration: "underline"}}>Log in</Link> to leave a review.</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}