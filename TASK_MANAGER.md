# Rabyte-Tech: Task Manager & Architecture Roadmap (v2.0)

This document tracks the progress of the Rabyte-Tech marketplace. Based on the **v2 Architecture Document**, we are executing this project using **pure HTML, CSS, Vanilla JavaScript, and Cloudflare Pages/Functions (D1 + R2)**. We are **NOT** using Next.js. 

**Total Time Spent:** ~3 Hours  
**Estimated Time Remaining:** ~5-7 Hours (due to URL Importer & Scraping logic)

---

## ✅ Completed Tasks (HTML, CSS, JS)

### 1. Infrastructure & Authentication
- [x] **Architecture Pivot:** Purged Next.js, migrated to a lightweight HTML/CSS/JS frontend powered by Cloudflare Pages Functions.
- [x] **D1 Database Setup:** Initialized the `schema.sql` (Users, Products, Categories, Stats, Sessions).
- [x] **Auth APIs:** Built `/api/auth/register`, `login`, `me`, `forgot-password`.
- [x] **Auth UIs:** Built `login.html`, `register.html`, and `forgot-password.html`.
- [x] **Security:** HTTP-only cookies and forceful temporary password reset loop.

### 2. Frontend Overhaul & Mobile Responsiveness
- [x] **Premium UI Tokens:** Implemented modern glassmorphism, typography, and hover effects in `styles.css`.
- [x] **Web Components:** Created reusable `<template-header>` and `<template-footer>`.
- [x] **Mobile UI:** Built the mobile-responsive Hamburger menu and optimized grids for mobile devices.

### 3. Dynamic Products Engine & SEO Routing
- [x] **Homepage API:** `/api/products` fetches active products dynamically.
- [x] **Dynamic Detail Pages:** Created `product-detail.html` populated via JS.
- [x] **SEO-Friendly URLs:** Built Cloudflare routing (`functions/products/[slug].js`) to serve products at `/products/product-slug`.
- [x] **Redirect Fix:** Solved Cloudflare Clean URLs 301 loop issue.

### 4. Legal & SEO Content
- [x] Created `privacy.html`, `terms.html`, `refund.html`, `faq.html`, `contact.html`, and `about.html` with full SEO-rich text.

---

## ⏳ Pending Tasks (To-Do)

### 5. Product URL Importer (Core Feature) ⚠️ *High Priority*
As per the architecture doc, sellers will NOT manually type everything. They will paste a URL and we extract the data.
- [ ] **Importer API:** Build a backend API to fetch and parse external HTML metadata.
- [ ] **Platform Adapters:** Write scraping logic for Gumroad, Payhip, Lemon Squeezy, CosmoFit, and a Generic fallback.
- [ ] **Extracted Fields:** Automatically pull Title, Description, Price, Currency, and Sales Count (if public).
- [ ] **Submission UI:** Build a UI where the seller pastes the URL, sees an "Import Report", and can edit the drafted fields before finalizing.

### 6. Cloudflare R2 Image Strategy
We will not hotlink external images. Rabyte-Tech hosts its own primary cover images.
- [ ] **R2 Integration:** Setup Cloudflare R2 bucket binding.
- [ ] **Upload API:** Create an endpoint to generate short-lived presigned upload URLs.
- [ ] **Frontend Upload:** Add an image uploader to the product submission form so sellers can upload their 1 primary cover image.

### 7. Seller Profile-as-Storefront (`/u/[username]`)
The seller profile *is* the store. No separate store entity.
- [ ] **Routing:** Create `functions/u/[username].js` to serve a static profile template.
- [ ] **Profile API:** Fetch seller data, bio, trust score, and all their published products.
- [ ] **Profile UI:** Build `seller-profile.html` featuring the avatar, bio, trust strip, top testimonials, and a responsive product grid sorted by newest/top-rated.

### 8. Seller Dashboard (`/user/dashboard.html`)
One unified dashboard for the user to manage their identity and products.
- [ ] **Overview Tab:** Views, outbound clicks, and overall ratings.
- [ ] **Products Tab:** List all products (Draft, Pending, Published).
- [ ] **Settings Tab:** Edit avatar, display name, username, and bio (No "Store Name").

### 9. Admin Moderation Panel (`/admin/index.html`)
- [ ] **Auth Check:** Ensure strict access control for `role === 'admin'`.
- [ ] **Product Moderation:** View all `pending` products and `Approve` or `Reject` them.
- [ ] **User Management:** View all users, manage reports, and adjust Trust Scores.

### 10. Ratings, Testimonials, and Stats tracking
- [ ] **Stats API:** Build an endpoint to track outbound clicks (when a user clicks "Buy on Source").
- [ ] **Testimonials UI:** Allow logged-in buyers to leave a review on a Rabyte-Tech product page.

### 11. Search & Categories
- [ ] **Search API & UI:** Allow users to search the marketplace by product title/keywords.
- [ ] **Category Pages:** Dynamic routes for `/categories/[slug]` to view products by type (e.g. Software, Templates).
