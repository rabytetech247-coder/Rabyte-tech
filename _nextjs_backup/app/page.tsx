import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Icon from "@/components/Icon";
import { products, categories } from "@/data/products";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <section className="category-section container section-spacing">
        <div className="section-header fade-in-up">
          <div className="header-left">
            <h2><span className="icon-box icon-yellow"><Icon name="crown" size={24} /></span> Featured Tools & Assets</h2>
            <p>Hand-picked AI systems and SaaS templates worth discovering.</p>
          </div>
          <Link href="/featured" className="view-all-link">View All Featured &rarr;</Link>
        </div>
        <div className="products">
          {products.slice(0, 5).map(p => <ProductCard key={p.id} p={p} featured={true} />)}
        </div>
      </section>

      <section className="category-section container section-spacing">
        <div className="section-header fade-in-up">
          <div className="header-left">
            <h2><span className="icon-box icon-lightning"><Icon name="lightning" size={24} /></span> Newly Added Assets</h2>
            <p>Check out the latest digital resources from our top creators.</p>
          </div>
          <Link href="/products" className="view-all-link">View All &rarr;</Link>
        </div>
        <div className="products">
          {products.slice(0, 15).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="category-section container section-spacing">
        <div className="section-header fade-in-up">
          <div className="header-left">
            <h2><span className="icon-box icon-yellow"><Icon name="star" size={24} /></span> Top Rated Systems</h2>
            <p>Explore the highest-rated architectures from our community.</p>
          </div>
          <Link href="/top-rated" className="view-all-link">View All &rarr;</Link>
        </div>
        <div className="products">
          {products.slice(0, 15).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="category-section container section-spacing">
        <div className="section-header fade-in-up">
          <div className="header-left">
            <h2><span className="icon-box icon-lightning"><Icon name="menu" size={24} /></span> All Templates</h2>
            <p>Browse our entire catalog of ready-to-use solutions.</p>
          </div>
          <Link href="/products" className="view-all-link">Explore Directory &rarr;</Link>
        </div>
        <div className="products">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-container">
          <div className="cta-content">
            <span className="cta-badge">FOR CREATORS</span>
            <h2>Have a SaaS or AI tool?</h2>
            <p>List it for free and let other developers discover it.</p>
            <div className="cta-features">
              <span><Icon name="check" size={16} /> No listing fee</span>
              <span><Icon name="check" size={16} /> Reach more customers</span>
              <span><Icon name="check" size={16} /> Grow your audience</span>
            </div>
          </div>
          <div className="cta-action">
            <div className="up-arrow-icon"><Icon name="arrowUp" size={40} /></div>
            <Link href="/submit" className="btn-cta">Submit Your Product &rarr;</Link>
          </div>
        </div>
      </section>
      
      <section className="category-section container section-spacing">
        <div className="section-header fade-in-up">
          <div className="header-left">
            <h2><span className="icon-box icon-orange"><Icon name="grid" size={24} /></span> Browse by Category</h2>
            <p>Explore digital products in your area of interest.</p>
          </div>
          <Link href="/categories" className="view-all-link">View All Categories &rarr;</Link>
        </div>
        <div className="category-grid">
          {categories.map(c => <CategoryCard key={c.name} c={c} />)}
        </div>
      </section>

    </main>
  );
}