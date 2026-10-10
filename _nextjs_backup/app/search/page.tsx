import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const runtime = 'edge';

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const q = params.q?.toLowerCase() || "";
  const filteredProducts = q 
    ? products.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    : products;

  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">SEARCH</small>
          <h1>Search products</h1>
          <form className="large-search" action="/search" method="GET">
            <input name="q" defaultValue={params.q || ""} placeholder="Try 'AI tools', 'Instagram', 'templates'..." />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>
      <section className="section container">
        {filteredProducts.length > 0 ? (
          <div className="products">
            {filteredProducts.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="notice" style={{ textAlign: "center", padding: "40px" }}>
            No products found for "{params.q}". Try a different keyword.
          </div>
        )}
      </section>
    </PageShell>
  );
}