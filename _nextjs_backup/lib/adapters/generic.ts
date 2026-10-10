import { PlatformAdapter, ImportedProductData } from "./index";

export class GenericAdapter extends PlatformAdapter {
  match(url: string): boolean {
    return true; // Fallback matches everything
  }

  async parse(url: string, html: string): Promise<ImportedProductData> {
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) 
      || html.match(/<title>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);

    const title = titleMatch ? titleMatch[1] : "Unknown Product";
    const description = descMatch ? descMatch[1] : "";
    const imageUrl = imageMatch ? imageMatch[1] : undefined;
    
    // Guess platform from domain
    let platform = "Website";
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.replace("www.", "");
      
      if (hostname.includes("gumroad.com")) platform = "Gumroad";
      else if (hostname.includes("lemonsqueezy.com")) platform = "Lemon Squeezy";
      else if (hostname.includes("payhip.com")) platform = "Payhip";
      else platform = hostname;
    } catch(e) {}

    return {
      title,
      description,
      platform,
      url,
      imageUrl
    };
  }
}
