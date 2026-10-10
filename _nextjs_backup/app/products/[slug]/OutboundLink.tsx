"use client";

import React from "react";

export default function OutboundLink({ href, productId, children, className, style }: { href: string, productId: string, children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  
  const handleClick = () => {
    // Fire and forget
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        eventType: "outbound_click"
      })
    }).catch(err => console.error(err));
  };

  return (
    <a href={href} target="_blank" rel="noreferrer" onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}
