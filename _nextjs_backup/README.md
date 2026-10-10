# Rabyte-Tech Full Next.js Template

This package extends the homepage into the full page-level frontend template for the Digital Product Discovery Platform.

## Included public pages
/, /products, /products/[slug], /categories, /categories/[slug], /search, /featured, /top-rated, /submit, /login, /register, /forgot-password, /reset-password/[token], /about, /contact, /faq, /blog, /blog/[slug], /advertise, /terms, /privacy, /dmca, /seller-policy, /seller/[username]

## Included unified account/dashboard pages
/dashboard
/dashboard/products
/dashboard/products/new
/dashboard/products/[id]/edit
/dashboard/analytics
/dashboard/reviews
/dashboard/blog
/dashboard/profile
/dashboard/settings

## Included admin pages
/admin
/admin/products
/admin/submissions
/admin/users
/admin/categories
/admin/reviews
/admin/featured
/admin/advertising
/admin/blog
/admin/reports
/admin/emails
/admin/analytics
/admin/settings

## Architecture alignment
The frontend is intentionally ready to be connected to the previously defined architecture:
- Next.js App Router
- Cloudflare Workers / vinext
- D1
- R2
- KV
- Turnstile
- Cloudflare Email Service
- secure email/password authentication
- product URL importer adapters for Gumroad, Lemon Squeezy, Payhip, CosmoFit and Other
- seller profile as storefront
- product analytics and outbound click tracking
- moderation and admin workflows

The current pages use local demo data. No fake claim is made that authentication, scraping, payments, D1 or R2 are already live.

## Run
npm install
npm run dev

## AntiGravity
Use this repository as the visual/page architecture baseline. Preserve:
- routes
- component structure
- Rabyte-Tech orange/black design system
- separated image assets
- responsive behavior
- product/source terminology
- seller profile/storefront model
- external checkout model

Then replace demo data and placeholder actions with the D1/R2/Workers implementation.
