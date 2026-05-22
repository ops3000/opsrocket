// Tiny "who am I" endpoint for the HeroPrompt to gate its submit.
// Returns 200 {login, avatar_url, starred} when signed in, 401 otherwise.
// Local-dev bypass: set OPSROCKET_DEV_NO_AUTH=1 in .env.local to skip
// GitHub OAuth and return a mock user. Hard-gated on NODE_ENV so this
// can't be turned on in a production deployment by mistake.
import { NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession, readCookie } from "@/lib/auth";

export const runtime = "nodejs";

const DEV_BYPASS =
  process.env.NODE_ENV !== "production" &&
  process.env.OPSROCKET_DEV_NO_AUTH === "1";

export async function GET(req: Request) {
  let s = null;
  try {
    s = decodeSession(readCookie(req, SESSION_COOKIE));
  } catch {
    // env not configured yet → treat as anonymous
  }
  if (!s) {
    if (DEV_BYPASS) {
      return NextResponse.json({
        ok: true,
        login: "dev",
        avatar_url: "https://github.com/identicons/dev.png",
        starred: false,
      });
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    login: s.u,
    avatar_url: s.a,
    starred: s.s,
  });
}
