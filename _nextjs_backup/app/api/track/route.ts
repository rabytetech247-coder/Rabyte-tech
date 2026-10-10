export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { productId, eventType, referrer, countryCode, sessionId } = body;

    if (!productId || !eventType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await getCurrentUser();
    const db = getDb();
    const id = crypto.randomUUID();

    await db.prepare(`
      INSERT INTO events (id, product_id, user_id, event_type, session_id, referrer, country_code)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, 
      productId, 
      user?.id || null, 
      eventType, 
      sessionId || null, 
      referrer || null, 
      countryCode || null
    ).run();

    // Optionally update aggregated stats
    if (eventType === "page_view") {
      await db.prepare(`
        INSERT INTO product_stats (product_id, page_views) 
        VALUES (?, 1)
        ON CONFLICT(product_id) DO UPDATE SET page_views = page_views + 1
      `).bind(productId).run();
    } else if (eventType === "outbound_click") {
      await db.prepare(`
        INSERT INTO product_stats (product_id, outbound_clicks) 
        VALUES (?, 1)
        ON CONFLICT(product_id) DO UPDATE SET outbound_clicks = outbound_clicks + 1
      `).bind(productId).run();
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

