export const runtime = 'edge';
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "products"; // 'products' or 'users'

  const db = getDb();
  let data: any[] = [];

  if (type === "users") {
    data = (await db.prepare("SELECT id, email, username, role, status, created_at, trust_score FROM users").all()).results || [];
  } else {
    data = (await db.prepare("SELECT p.id, p.title, p.status, p.created_at, u.username as seller FROM products p JOIN users u ON p.seller_id = u.id").all()).results || [];
  }

  if (data.length === 0) {
    return new NextResponse("No data", { status: 404 });
  }

  // Convert JSON to CSV
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row: any) => 
    Object.values(row)
      .map((val: any) => typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val)
      .join(",")
  );
  
  const csv = [headers, ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${type}-export-${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}

