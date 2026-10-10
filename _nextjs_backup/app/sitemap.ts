import { MetadataRoute } from 'next';
import { getDb } from '@/lib/db';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = getDb();

  // Fetch active products
  const products = (await db.prepare("SELECT slug, updated_at FROM products WHERE status = 'active'").all()).results || [];
  
  // Fetch sellers
  const sellers = (await db.prepare(`
    SELECT DISTINCT u.username, u.created_at 
    FROM users u
    JOIN products p ON p.seller_id = u.id
    WHERE p.status = 'active'
  `).all()).results || [];

  const productUrls = products.map((product: any) => ({
    url: `https://rabyte.tech/products/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const sellerUrls = sellers.map((seller: any) => ({
    url: `https://rabyte.tech/seller/${seller.username}`,
    lastModified: new Date(seller.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const staticUrls = [
    {
      url: 'https://rabyte.tech',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://rabyte.tech/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ];

  return [...staticUrls, ...productUrls, ...sellerUrls];
}
