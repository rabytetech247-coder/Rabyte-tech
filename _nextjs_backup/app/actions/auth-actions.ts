"use server";

import { redirect } from "next/navigation";
import { compareSync, hashSync } from "bcrypt-ts";
import { getDb } from "@/lib/db";
import { createSession, logout } from "@/lib/auth";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Missing email or password" };
  }

  const db = getDb();
  const user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<any>();

  if (!user || !compareSync(password, user.password_hash)) {
    return { error: "Invalid email or password" };
  }

  await createSession(user.id);
  
  if (user.role === 'admin' || user.role === 'superadmin') {
    redirect("/admin/panel");
  } else {
    redirect("/dashboard");
  }
}

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !username) {
    return { error: "Missing required fields" };
  }

  const db = getDb();
  
  // Check if email or username exists
  const existing = await db.prepare("SELECT id FROM users WHERE email = ? OR username = ?").bind(email, username).first();
  if (existing) {
    return { error: "Email or username already in use" };
  }

  const id = crypto.randomUUID();
  const hash = hashSync(password, 10);

  await db.prepare(`
    INSERT INTO users (id, email, password_hash, username, role, created_at)
    VALUES (?, ?, ?, ?, 'seller', ?)
  `).bind(id, email, hash, username, Date.now()).run();

  await createSession(id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await logout();
  redirect("/");
}
