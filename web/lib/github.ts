// Thin GitHub OAuth + REST client (no SDK; just fetch). Used by the
// /api/auth/github/* routes — see lib/auth.ts for the session side.

const UA = "opsrocket-web/1.0 (+https://ops.sg)";

export function authorizeUrl(redirectUri: string, state: string): string {
  const id = process.env.GITHUB_CLIENT_ID;
  if (!id) throw new Error("GITHUB_CLIENT_ID env var not set");
  // We expect this to be a GitHub *App* (not a classic OAuth App): its
  // declared permissions are fixed in the app config (just "Starring:
  // read & write" — no repo / code / issues access), so the consent
  // screen shows that one line. The `scope` query param is ignored for
  // GitHub Apps, so we omit it.
  const q = new URLSearchParams({
    client_id: id,
    redirect_uri: redirectUri,
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
 *
 * 403 = the token lacks the "Starring: write" permission. Check the
 *   GitHub App config (Settings → Developer settings → GitHub Apps →
 *   <app> → Permissions → User permissions → Starring: Read and write)
 *   AND the Vercel env vars (GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
 *   must be the GitHub App's, not the old classic OAuth app's).
 * 404 = repo not found / private — verify STAR_REPO env.
 * 401 = bad/expired token.
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
  if (r.status !== 204) {
    // Drain the body so we can surface GitHub's diagnostic message in
    // Vercel function logs. Don't throw — sign-in should still succeed
    // even if starring fails.
    let body = "";
    try {
      body = (await r.text()).slice(0, 400);
    } catch {
      /* ignore */
    }
    const scopes = r.headers.get("x-oauth-scopes") ?? "(none)";
    const acceptedScopes =
      r.headers.get("x-accepted-oauth-scopes") ?? "(none)";
    // First 5 chars of the token tell us its kind: ghu_=GitHub App user
    // token (right), gho_=classic OAuth (wrong client_id env), others=odd.
    const tokenKind = token.slice(0, 5);
    console.warn(
      `[starRepo] ${ownerRepo} → ${r.status} ${r.statusText} · ` +
        `token=${tokenKind}... · x-oauth-scopes=${scopes} · ` +
        `accepted=${acceptedScopes} · body=${body}`,
    );
  }
  return r.status === 204;
}
