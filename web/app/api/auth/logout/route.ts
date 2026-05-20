// Clear the session cookie. Idempotent; works as either GET or POST.
import { NextResponse } from "next/server";
import { SESSION_COOKIE, setCookie } from "@/lib/auth";

export const runtime = "nodejs";

function clear(req: Request) {
  const next = new URL(req.url).searchParams.get("next") || "/";
  const res = NextResponse.redirect(
    new URL(next.startsWith("/") ? next : "/", req.url),
  );
  res.headers.append(
    "Set-Cookie",
    setCookie(SESSION_COOKIE, "", { clear: true }),
  );
  return res;
}

export const GET = clear;
export const POST = clear;
