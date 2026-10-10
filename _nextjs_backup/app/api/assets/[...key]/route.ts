export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { getAssetsBucket } from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  if (!key || key.length === 0) return new NextResponse("Not Found", { status: 404 });

  const path = key.join("/");
  const bucket = getAssetsBucket();
  
  const object = await bucket.get(path);
  if (!object) return new NextResponse("Not Found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers as any);
  headers.set("etag", object.httpEtag);

  return new NextResponse(object.body as any, {
    headers,
  });
}
