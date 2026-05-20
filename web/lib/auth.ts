// Lightweight cookie session for the homepage chatbox gate. No DB, no
// third-party auth library — an HMAC-signed JSON payload in an httpOnly
// cookie. The OAuth code-exchange flow lives in /api/auth/github/*.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "opsrocket_session";
export const STATE_COOKIE = "opsrocket_oauth_state";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
export const STATE_MAX_AGE = 60 * 10; // 10 minutes

export type Session = {
  /** GitHub login (username). */
  u: string;
  /** GitHub avatar URL. */
  a: string;
  /** True if we starred the repo for this user during this OAuth flow. */
  s: boolean;
  /** Issued-at (unix seconds). */
  iat: number;
  /** Expires (unix seconds). */
  exp: number;
};

function secret(): Buffer {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16)
    throw new Error(
      "SESSION_SECRET env var missing or too short (need 16+ chars)",
    );
  return Buffer.from(s, "utf8");
}

function b64url(b: Buffer): string {
  return b
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function b64urlDecode(s: string): Buffer {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payload: string): string {
  return b64url(createHmac("sha256", secret()).update(payload).digest());
}

export function encodeSession(s: Session): string {
  const payload = b64url(Buffer.from(JSON.stringify(s), "utf8"));
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string | undefined): Session | null {
  if (!token) return null;
  const ix = token.lastIndexOf(".");
  if (ix < 1) return null;
  const payload = token.slice(0, ix);
  const givenSig = token.slice(ix + 1);
  const wantSig = sign(payload);
  if (givenSig.length !== wantSig.length) return null;
  if (
    !timingSafeEqual(Buffer.from(givenSig, "utf8"), Buffer.from(wantSig, "utf8"))
  )
    return null;
  try {
    const s = JSON.parse(b64urlDecode(payload).toString("utf8")) as Session;
    if (typeof s.exp !== "number" || s.exp < Math.floor(Date.now() / 1000))
      return null;
    return s;
  } catch {
    return null;
  }
}

export function newSession(u: string, a: string, starred: boolean): Session {
  const now = Math.floor(Date.now() / 1000);
  return { u, a, s: starred, iat: now, exp: now + SESSION_MAX_AGE };
}

export function randomState(): string {
  return randomBytes(16).toString("hex");
}

/** Read a cookie value by name from a Request. */
export function readCookie(req: Request, name: string): string | undefined {
  const raw = req.headers.get("cookie");
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const k = part.slice(0, eq).trim();
    if (k === name) return decodeURIComponent(part.slice(eq + 1).trim());
  }
  return undefined;
}

/** Build a Set-Cookie header value. */
export function setCookie(
  name: string,
  value: string,
  opts: { maxAge?: number; clear?: boolean } = {},
): string {
  const parts = [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ];
  if (opts.clear) parts.push("Max-Age=0");
  else if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`);
  return parts.join("; ");
}

/** Repo we auto-star on sign-in. Override with STAR_REPO env if you fork. */
export const STAR_REPO = process.env.STAR_REPO || "ops3000/opsrocket";
