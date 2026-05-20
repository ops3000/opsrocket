// Thin GitHub OAuth + REST client (no SDK; just fetch). Used by the
// /api/auth/github/* routes — see lib/auth.ts for the session side.

const UA = "opsrocket-web/1.0 (+https://ops.sg)";

export function authorizeUrl(redirectUri: string, state: string): string {
  const id = process.env.GITHUB_CLIENT_ID;
  if (!id) throw new Error("GITHUB_CLIENT_ID env var not set");
  const q = new URLSearchParams({
    client_id: id,
    redirect_uri: redirectUri,
    scope: "public_repo", // enough to star a public repo + read user
    state,
    allow_signup: "true",
  });
  return `https://github.com/login/oauth/authorize?${q.toString()}`;
}

/** Exchange the OAuth code for an access token. */
export async function exchangeCode(
  code: string,
  redirectUri: string,
): Promise<string> {
  const id = process.env.GITHUB_CLIENT_ID;
  const secret = process.env.GITHUB_CLIENT_SECRET;
  if (!id || !secret)
    throw new Error(
      "GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET env vars not set",
    );
  const r = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": UA,
    },
    body: JSON.stringify({
      client_id: id,
      client_secret: secret,
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!r.ok) throw new Error(`github token exchange failed (${r.status})`);
  const j = (await r.json()) as { access_token?: string; error?: string };
  if (!j.access_token)
    throw new Error(`github token exchange: ${j.error ?? "no token"}`);
  return j.access_token;
}

/** Authenticated GitHub user (login + avatar). */
export async function getUser(
  token: string,
): Promise<{ login: string; avatar_url: string }> {
  const r = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": UA,
    },
  });
  if (!r.ok) throw new Error(`github /user failed (${r.status})`);
  return (await r.json()) as { login: string; avatar_url: string };
}

/**
 * PUT /user/starred/{owner}/{repo} — idempotent; 204 whether or not the
 * user already starred. Returns true on success.
 */
export async function starRepo(
  token: string,
  ownerRepo: string,
): Promise<boolean> {
  const r = await fetch(`https://api.github.com/user/starred/${ownerRepo}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Length": "0",
      "User-Agent": UA,
    },
  });
  return r.status === 204;
}
