import { AUTH_COOKIE, AUTH_COOKIE_VALUE, validateCredentials } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Noto‘g‘ri so‘rov" }, { status: 400 });
  }

  const u = String(body.username ?? "").trim();
  const p = String(body.password ?? "");

  if (!validateCredentials(u, p)) {
    return NextResponse.json({ error: "Login yoki parol noto‘g‘ri" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, AUTH_COOKIE_VALUE, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
