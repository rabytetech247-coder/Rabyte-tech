export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Point to the extensionless path to avoid Cloudflare Pages "Clean URLs" 301 redirect
  const newUrl = new URL("/product-detail", url.origin);
  const newRequest = new Request(newUrl.toString(), request);
  
  // Fetch the static asset
  return env.ASSETS.fetch(newRequest);
}
