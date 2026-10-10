import { cookies } from "next/headers";
import { getKv, getDb } from "./db";
import type { User } from "./db-types";

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const kv = getKv();
  
  // Store in KV for 30 days
  await kv.put(`session:${sessionId}`, userId, { expirationTtl: 60 * 60 * 24 * 30 });
  
  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) return null;
  
  const kv = getKv();
  return await kv.get(`session:${sessionId}`);
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (sessionId) {
    const kv = getKv();
    await kv.delete(`session:${sessionId}`);
    cookieStore.delete("session_id");
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;
  
  const db = getDb();
  const user = await db.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first<User>();
  return user || null;
}
