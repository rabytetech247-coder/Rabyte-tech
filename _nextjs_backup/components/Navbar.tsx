import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";

export default function Navbar() {
  return (
    <header className="nav-premium-wrap">
      <nav className="nav-premium container">
        <Logo />
        <div className="nav-links-premium">
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/featured">Featured</Link>
          <div className="nav-dropdown">
            <Link href="/blog">Resources <Icon name="chevron" size={14}/></Link>
          </div>
        </div>
        
        <form className="nav-search-premium">
          <input type="text" placeholder="Search digital products..." />
          <button type="submit"><Icon name="search" size={16} /></button>
        </form>

        <div className="nav-actions-premium">
          <Link href="/login" className="btn-login-premium">Login</Link>
          <Link href="/submit" className="btn-submit-premium">Submit Product</Link>
        </div>
        
        <button className="mobile-menu-btn"><Icon name="menu" size={24}/></button>
      </nav>
    </header>
  );
}