# ðŸš€ Rabyte-Tech Project Plan: v2.0 Architecture

This plan outlines the end-to-end development phases for the Rabyte-Tech Digital Product Discovery Marketplace. It strictly adheres to the Cloudflare architecture, the "Profile-as-Store" model, and the URL Importer constraints we established.

---

## ðŸ—ï¸ Phase 1: Foundation & Infrastructure Setup

**Goal:** Initialize the environment, establish database connections, and set up the design system.

- [x] **Dependencies & Tools:** Install necessary packages (`lucide-react`, `tailwindcss`, `drizzle-orm` or `cloudflare/d1` SDK).
- [x] **Design System Configuration:**
  - Update `tailwind.config.js` with the official palette: Orange (`#FF8A00`), Deep Black (`#0F0F0F`), Dark Gray (`#2B2B8B`), Light Background (`#FAFAFA`).
  - Configure the **Inter** font family across the app.
- [x] **Cloudflare Bindings Validation:** Ensure local `wrangler.toml` and `.env.local` bindings (D1, R2, KV) are functional via local miniflare/wrangler dev.

## ðŸ—„ï¸ Phase 2: Database Schema (Cloudflare D1)

**Goal:** Create the core relational tables to support the data model.

- [x] **Users Table:** `id, email, password_hash, username, avatar_url, bio, role`.
- [x] **Products Table:** `id, seller_id, title, description, source_url, canonical_url, source_price, import_status, status`.
- [x] **Categories Table:** `id, name, slug`.
- [x] **Events / Analytics Table:** Track views and outbound clicks.
- [x] **Ratings & Testimonials Table:** Keep Rabyte-Tech internal reviews separated from source ratings.

## ðŸŽ¨ Phase 3: Public UI & Discovery (Frontend)

**Goal:** Build the public-facing directory using the Next.js UI Design Atlas.

- [x] **Global Layouts:** Sticky responsive Navbar and Footer.
- [x] **Homepage:** Featured products slider, newly added products grid, top-rated products, and category grid.
- [x] **Category & Search Pages:** Dynamic filtering and responsive product cards.
- [x] **Product Detail Page:** Display extracted product data, primary R2 image, seller profile summary, and the crucial **"Buy on Source"** outbound CTA.

## ðŸ” Phase 4: Identity & "Profile-as-Storefront"

**Goal:** Implement authentication and the unified seller store experience.

- [x] **Authentication System:** Email/Password registration with secure session management backed by Cloudflare KV.
- [x] **Seller Profile Page (`/seller/[username]`):**
  - Public catalogue displaying the seller's trust metrics, bio, and a grid of all published products.
  - Dynamically generate category chips based on the seller's active products (no manual store categorization).
- [x] **Seller Dashboard:** Private routes for sellers to manage their profile and view their listed products.

## ðŸ•·ï¸ Phase 5: The URL Product Importer Engine

**Goal:** Build the core onboarding mechanism to fetch and parse external products without requiring manual entry.

- [x] **Importer UI:** A simple input field in the dashboard: "Paste Product URL".
- [ ] **Server-Side Validation:** Reject domain roots (e.g., `gumroad.com`). Ensure URL points to a specific product path.
- [ ] **Platform Adapters:**
  - `GumroadAdapter`: Parse public Gumroad product pages.
  - `LemonSqueezyAdapter`: Parse Lemon Squeezy product objects.
  - `PayhipAdapter` & `CosmoFitAdapter`.
  - `GenericAdapter`: Fallback for meta/OG tags.
- [ ] **Data Normalization & Drafts:** Map scraped data (Title, Price, Sales Count) into a product draft. Mark missing fields clearly.
- [x] **Image Upload (R2):** Allow the seller to upload the primary cover image directly to the Cloudflare R2 bucket (`rabyte-store-assets`).

## ðŸ›¡ï¸ Phase 6: Moderation & Admin Panel

**Goal:** Provide platform owners the tools to manage the marketplace.

- [x] **Admin Dashboard:** Overview of total users, products, and pending submissions.
- [x] **Product Moderation Queue:** Review imported products, check canonical URLs for duplicates, and approve/reject listings.
- [x] **User & Content Management:** Tools to handle DMCA takedowns, ban malicious actors, and manage featured product placements.

## âœï¸ Phase 7: Website Content Writing & SEO Strategy

**Goal:** Establish authoritative, search-optimized content across the marketplace to drive organic traffic.

- [x] **Keyword Research & Mapping:** Identify target keywords for the digital products space and map them to categories (e.g., "AI tools", "Next.js templates").
- [x] **Core Pages Content:** Draft compelling, keyword-rich copy for the Homepage, About Us, FAQ, and specific category landing pages.
- [x] **Seller Profiles & Storefront SEO:** Optimize the structure of seller profiles to act as indexable storefronts for organic reach.
- [x] **Blog/Content Architecture:** Set up a blog architecture for guest posting, tutorials, and content marketing to support domain authority.
- [x] **Local/Business SEO:** (If applicable) Set up initial Google Business/Local signals and structured data schemas.

## ðŸ“ˆ Phase 8: Analytics, Technical SEO & Final Deployment

**Goal:** Measure success, optimize technical search metrics, and launch.

- [x] **Outbound Tracking:** Capture clicks on the "Buy on Source" button before redirecting the user to the external checkout.
- [x] **Technical SEO Implementation:** Dynamic meta titles, Open Graph tags, canonical URLs, and dynamic `sitemap.xml`.
- [x] **Security:** Implement Turnstile (bot protection) on auth and importer routes.
- [x] **Production Deployment:** Final push to Cloudflare Workers via Wrangler.








