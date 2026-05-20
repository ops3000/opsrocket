// Kick off the GitHub OAuth flow: generate a CSRF state, stash it (along
// with the post-login `next` URL) in a short-lived signed cookie, redirect
// to GitHub's authorize page.
import { NextResponse } from "next/server";
import {
  STATE_COOKIE,
  STATE_MAX_AGE,
  encodeSession,
  randomState,
  setCookie,
} from "@/lib/auth";
import { authorizeUrl } from "@/lib/github";

export const runtime = "nodejs";

function callbackUrl(req: Request): string {
  const u = new URL("/api/auth/github/callback", new URL(req.url));
  u.protocol = "https:";
  return u.toString();
}

export async function GET(req: Request) {
  const incoming = new URL(req.url);
  // Where to send the user after login. Only same-origin relative paths.
  let next = incoming.searchParams.get("next") || "/workspace";
  if (!next.startsWith("/")) next = "/workspace";
  const state = randomState();
  // Encode {state, next} as a signed cookie reusing the session HMAC so
  // we can verify both on callback without a server store.
  const now = Math.floor(Date.now() / 1000);
  const stateCookie = encodeSession({
    u: state,
    a: next,
    s: false,
    iat: now,
    exp: now + STATE_MAX_AGE,
  });
  let url: string;
  try {
    url = authorizeUrl(callbackUrl(req), state);
  } catch (e) {
    // env vars missing — bounce home with a hint instead of 500
    const msg = e instanceof Error ? e.message : String(e);
    const home = new URL("/", incoming);
    home.searchParams.set("auth_error", msg);
    return NextResponse.redirect(home);
  }
  const res = NextResponse.redirect(url);
  res.headers.append(
    "Set-Cookie",
    setCookie(STATE_COOKIE, stateCookie, { maxAge: STATE_MAX_AGE }),
  );
  return res;
}
