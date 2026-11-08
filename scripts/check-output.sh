#!/usr/bin/env bash
# Checks the static site that `nuxt generate` wrote to .output/public.
# CI runs it after generate; run it locally the same way.
set -euo pipefail

out="${1:-.output/public}"
site='https://www.clarance.me'
fail=0
err() { echo "FAIL: $*" >&2; fail=1; }

[ -f "$out/index.html" ] || { echo "FAIL: $out/index.html missing, run nuxt generate first" >&2; exit 1; }

# Every content/blog post must be prerendered.
for md in content/blog/*.md; do
  slug=$(basename "$md" .md)
  [ -f "$out/blog/$slug/index.html" ] || err "blog/$slug was not prerendered"
done

# Canonical URLs point at www (WEBSITE-08).
for page in "$out/index.html" "$out"/blog/*/index.html; do
  path=${page#"$out"}; path=${path%index.html}; path=${path%/}
  grep -q "rel=\"canonical\" href=\"$site${path:-/}\"" "$page" \
    || err "$page: canonical is not $site${path:-/}"
done

# Sitemap and robots point at www, and nothing points at the bare apex.
grep -q "<loc>$site/</loc>" "$out/sitemap.xml" || err "sitemap.xml has no <loc>$site/</loc>"
grep -q "^Sitemap: $site/sitemap.xml$" "$out/robots.txt" || err "robots.txt Sitemap is not $site/sitemap.xml"
if grep -rlE 'https://clarance\.me' "$out" --include='*.html' --include='*.xml' --include='*.txt'; then
  err "files above link to the bare apex https://clarance.me"
fi

# The declared favicon exists (WEBSITE-10).
[ -f "$out/favicon.ico" ] || err "favicon.ico missing"
grep -q 'rel="icon" type="image/x-icon" href="/favicon.ico"' "$out/index.html" || err "index.html does not declare /favicon.ico"
if grep -rl 'favicon.png' "$out" --include='*.html'; then err "files above still reference favicon.png"; fi

# No session-replay recorder (rrweb) in the client bundle (WEBSITE-S-02, WEBSITE-06).
if grep -lE 'rrweb|takeFullSnapshot' "$out"/_nuxt/*.js; then
  err "files above contain the rrweb session recorder"
fi

[ "$fail" = 0 ] && echo "Output checks passed."
exit "$fail"
