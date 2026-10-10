"use client";

import { useEffect } from "react";

export default function AnalyticsTracker({ productId }: { productId: string }) {
  useEffect(() => {
    // Record a page view when the component mounts
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        eventType: "page_view",
        referrer: document.referrer || null
      })
    }).catch(err => console.error("Analytics error", err));
  }, [productId]);

  return null; // Invisible component
}
