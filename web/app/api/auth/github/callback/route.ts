// OAuth callback: verify the signed `state` cookie matches `?state=`,
// exchange `?code=` for an access token, fetch the user, **star the
// repo**, set the session cookie, redirect to the post-login `next` URL.
import { NextResponse } from "next/server";
import {
  STATE_COOKIE,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  STAR_REPO,
  decodeSession,
  encodeSession,
  newSession,
  readCookie,
  setCookie,
} from "@/lib/auth";
import { exchangeCode, getUser, starRepo } from "@/lib/github";

export const runtime = "nodejs";

function callbackUrl(req: Request): string {
  const u = new URL("/api/auth/github/callback", new URL(req.url));
  u.protocol = "https:";
  return u.toString();
}

function bail(req: Request, msg: string) {
  const home = new URL("/", req.url);
  home.searchParams.set("auth_error", msg);
  // Clear the state cookie on the way out.
  const res = NextResponse.redirect(home);
  res.headers.append("Set-Cookie", setCookie(STATE_COOKIE, "", { clear: true }));
  return res;
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const code = u.searchParams.get("code");
  const state = u.searchParams.get("state");
  if (!code || !state) return bail(req, "missing code/state");

  // Verify state from the signed cookie and recover the `next` URL.
  const stored = decodeSession(readCookie(req, STATE_COOKIE));
  if (!stored || stored.u !== state) return bail(req, "state mismatch");
  const next = stored.a.startsWith("/") ? stored.a : "/workspace";

  let token: string;
  try {
    token = await exchangeCode(code, callbackUrl(req));
  } catch (e) {
    return bail(req, e instanceof Error ? e.message : String(e));
  }

  let user: { login: string; avatar_url: string };
  try {
    user = await getUser(token);
  } catch (e) {
    return bail(req, e instanceof Error ? e.message : String(e));
  }

  // Best-effort star — failure here shouldn't block sign-in.
  let starred = false;
  try {
    starred = await starRepo(token, STAR_REPO);
  } catch {
    starred = false;
  }

  const session = newSession(user.login, user.avatar_url, starred);
  const res = NextResponse.redirect(new URL(next, req.url));
  res.headers.append(
    "Set-Cookie",
    setCookie(SESSION_COOKIE, encodeSession(session), {
      maxAge: SESSION_MAX_AGE,
    }),
  );
  res.headers.append(
    "Set-Cookie",
    setCookie(STATE_COOKIE, "", { clear: true }),
  );
  return res;
}
