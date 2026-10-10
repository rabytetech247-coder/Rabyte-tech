import { GenericAdapter } from "./generic";
import type { ImportedProductData } from "./index";

const adapters = [
  // we can add GumroadAdapter, etc. later. The Generic adapter is very strong for OG tags.
  new GenericAdapter()
];

export async function importProductUrl(url: string): Promise<ImportedProductData> {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch(e) {
    throw new Error("Invalid URL provided.");
  }

  // Reject root domains
  if (parsedUrl.pathname === "/" || parsedUrl.pathname === "") {
    throw new Error("Please provide a specific product URL, not a store's root homepage.");
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Rabyte-Tech-Importer/1.0"
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch URL. Status: ${res.status}`);
  }

  const html = await res.text();
  
  for (const adapter of adapters) {
    if (adapter.match(url)) {
      return await adapter.parse(url, html);
    }
  }

  throw new Error("No suitable adapter found to process this URL.");
}
