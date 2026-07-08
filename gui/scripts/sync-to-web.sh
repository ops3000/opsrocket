#!/usr/bin/env bash
# Build gui/ and drop the bundle at web/public/workspace-app/, ready for the
# iframe in /workspace. Patches the built index.html to:
#   1. add /workspace-shim.js (which intercepts /api/* → WASM in-tab)
#   2. rewrite asset paths from /assets/ → /workspace-app/assets/
# Run from anywhere; resolves relative to its own location.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

DEST="../web/public/workspace-app"
mkdir -p "$DEST"
# rsync, but preserve any non-bundle files the dest already has (textures,
# ops.png, the shim's siblings live in web/public not workspace-app, so this
# is mostly belt-and-braces).
rsync -a --delete \
  --exclude '__nothing__' \
  dist/ "$DEST/"

ROOT_TEXTURES="../web/public/textures"
mkdir -p "$ROOT_TEXTURES"
rsync -a --delete dist/textures/ "$ROOT_TEXTURES/"

INDEX="$DEST/index.html"
# Rewrite Vite's default /assets/ → /workspace-app/assets/ and prepend the
# shim. Idempotent: the shim line is only injected if not already present.
if ! grep -q '/workspace-shim.js' "$INDEX"; then
  sed -i.bak \
    -e 's|<head>|<head>\
    <script src="/workspace-shim.js"></script>|' \
    "$INDEX"
fi
sed -i.bak -e 's|/assets/|/workspace-app/assets/|g' "$INDEX"
rm -f "$INDEX.bak"

echo "synced gui/dist → $DEST"
