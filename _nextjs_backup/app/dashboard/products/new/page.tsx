"use client";

import PageShell from "@/components/PageShell";
import { Field } from "@/components/Forms";
import { useFormState, useFormStatus } from "react-dom";
import { importProductAction } from "@/app/actions/product-actions";
import Icon from "@/components/Icon";
import Script from "next/script";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="button" disabled={pending} style={{marginTop: 15}}>
      {pending ? "Importing Data..." : (
        <><Icon name="download" size={16} /> Fetch Product Details</>
      )}
    </button>
  );
}

export default function NewProduct() {
  const [state, action] = useFormState(importProductAction, undefined);

  return (
    <PageShell>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <section className="dashboard">
        <div className="container dashboard-grid">
          <aside className="side">
            <b>Seller Dashboard</b>
            <a href="/dashboard">Overview</a>
            <a href="/dashboard/products">Products</a>
            <a href="/dashboard/products/new" style={{color: "var(--o)", fontWeight: 700}}>Add product</a>
            <a href="/dashboard/analytics">Analytics</a>
            <a href="/dashboard/reviews">Reviews</a>
            <a href="/dashboard/blog">Blog</a>
            <a href="/dashboard/profile">Profile / Storefront</a>
          </aside>
          <section className="dash-main">
            <small className="eyebrow">PRODUCTS</small>
            <h1>Import Product</h1>
            <p>Paste the public URL to your product (Gumroad, Lemon Squeezy, etc.). We'll automatically fetch the details.</p>
            
            <form action={action} className="form-card" style={{ marginTop: 25 }}>
              {state?.error && <div className="notice" style={{ color: "red", marginBottom: 20 }}>{state.error}</div>}
              
              <div className="import-box">
                <label>Product URL</label>
                <input name="url" type="url" placeholder="https://..." required style={{ width: "100%" }} />
                <small>Make sure the URL points to a specific product page, not your store root.</small>
              </div>

              <div className="cf-turnstile" data-sitekey="1x00000000000000000000AA" style={{marginTop: 15}}></div>

              <SubmitButton />
            </form>
          </section>
        </div>
      </section>
    </PageShell>
  );
}