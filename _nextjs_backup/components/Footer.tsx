import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="container footer-grid-premium">
        
        <div className="footer-brand-col">
          <Logo />
          <p className="footer-desc">A free marketplace for digital products created by independent creators around the world.</p>
          <div className="footer-socials">
             <a href="#" className="social-icon">X</a>
             <a href="#" className="social-icon">f</a>
             <a href="#" className="social-icon">in</a>
          </div>
        </div>

        <div className="footer-link-col">
          <b>Explore</b>
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/featured">Featured Products</Link>
          <Link href="/top-rated">Top Rated</Link>
          <Link href="/blog">Resources</Link>
        </div>

        <div className="footer-link-col">
          <b>For Sellers</b>
          <Link href="/submit">Submit Product</Link>
          <Link href="/dashboard">Seller Dashboard</Link>
          <Link href="/guidelines">Listing Guidelines</Link>
          <Link href="/advertise">Featured Placement</Link>
          <Link href="/seller-policy">Seller Policy</Link>
        </div>

        <div className="footer-link-col">
          <b>Company</b>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/dmca">DMCA</Link>
        </div>

        <div className="footer-subscribe-col">
          <b>Subscribe to Updates</b>
          <p>Get the latest products, tips and resources directly to your inbox.</p>
          <form className="subscribe-form">
             <input type="email" placeholder="Enter your email" />
             <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="container footer-bottom-premium">
        <p>© 2024 Rabyte-Tech. All rights reserved.</p>
        <div className="footer-bottom-links">
           <Link href="/terms">Terms</Link>
           <Link href="/privacy">Privacy</Link>
           <Link href="/dmca">DMCA</Link>
           <Link href="/seller-policy">Seller Policy</Link>
        </div>
      </div>
    </footer>
  );
}