import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1Database, KVNamespace, R2Bucket } from "@cloudflare/workers-types";

export function getDb(): D1Database {
  const { env } = getCloudflareContext();
  return env.DB;
}

export function getKv(): KVNamespace {
  const { env } = getCloudflareContext();
  return env.KV;
}

export function getAssetsBucket(): R2Bucket {
  const { env } = getCloudflareContext();
  return env.ASSETS_BUCKET;
}
