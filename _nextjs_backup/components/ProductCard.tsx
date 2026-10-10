import Link from "next/link";
import Icon from "./Icon";
import type { Product } from "@/data/products";

export default function ProductCard({ p, featured = false }: { p: Product, featured?: boolean }) {
  return (
    <article className="product-card">
      <Link href={"/products/" + p.id} className="product-image-wrap">
        <img src={p.image} alt={p.title} />
        {featured && <span className="badge"><Icon name="star" size={10} style={{marginRight: 4}} /> Featured</span>}
        <span className="source">{p.source}</span>
      </Link>
      <div className="product-body">
        <small className="eyebrow">{p.category}</small>
        <Link href={"/products/" + p.id} className="product-title">{p.title}</Link>
        <p>{p.description}</p>
        <div className="meta">
          <div className="rating">
            <Icon name="star" size={12} />
            <strong>{p.rating}</strong> <span>({p.reviews})</span>
          </div>
          <div className="pc-creator">
            {p.seller || "Creator"}
          </div>
        </div>
        <div className="bottom">
          <strong>{p.price}</strong>
          <Link href={"/products/" + p.id}>View Product &rarr;</Link>
        </div>
      </div>
    </article>
  );
}