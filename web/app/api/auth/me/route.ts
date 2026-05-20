// Tiny "who am I" endpoint for the HeroPrompt to gate its submit.
// Returns 200 {login, avatar_url, starred} when signed in, 401 otherwise.
import { NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession, readCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  let s = null;
  try {
    s = decodeSession(readCookie(req, SESSION_COOKIE));
  } catch {
    // env not configured yet → treat as anonymous
  }
  if (!s) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({
    ok: true,
    login: s.u,
    avatar_url: s.a,
    starred: s.s,
  });
}
