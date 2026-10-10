const { execSync } = require('child_process');

// This script prevents the Vercel CLI from recursively invoking the Cloudflare builder
// when Cloudflare's CI runs 'npm run build' as the default command.

try {
  if (process.env.INTERNAL_NEXT_BUILD === 'true') {
    // We are inside the Vercel CLI execution step, run standard Next.js build
    console.log("=> Running standard Next.js build...");
    execSync('npx next build', { stdio: 'inherit' });
  } else {
    // We are at the top level Cloudflare CI execution step
    console.log("=> Running OpenNext Cloudflare builder...");
    process.env.INTERNAL_NEXT_BUILD = 'true';
    execSync('npx @opennextjs/cloudflare build --dangerouslyUseUnsupportedNextVersion', { stdio: 'inherit' });
  }
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
