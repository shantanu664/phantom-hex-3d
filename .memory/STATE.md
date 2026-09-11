# State - Produsa web properties

_Last updated: 2026-09-11 18:00 UTC_

## Current focus

Seven public web properties: aether-site and optimiza-site (React+Vite), coup-site, tech-ai-site, overvolt-site, proagility and phantom-hex-3d (hand-rolled HTML). Shipped to *.produsa.app via Cloudflare Pages.

> **The live thread is not recorded.** This file was generated from the studio
> registry and this repo's real git state on 2026-09-11. Everything below is
> checkable; nothing here claims to know what you were last doing, because
> nothing established it. Replace this block when you next pick the project up —
> a bank that guesses is worse than one that admits the gap.

Last commit: `47792d1` memory: add committed memory bank (STATE/JOURNAL/SNAPSHOT)
Dated: 2026-09-10 15:41:11 +0000

## In flight

- Branch `main`, HEAD `47792d1`.
- Working tree clean.

## Next steps

- [ ] Record the real current focus and next steps here.
- [ ] Read first: `README.md`
- [ ] Read first: `/root/mediastack/mediastack.md`

## Commands

- `~/deploy-produsa.sh <app> <dist-dir>` — deploy
- `npm run build` — build

## Generated — never author these

- `dist/`

An edit here is erased silently on the next build. Edit upstream.

## Landmines

- The Cloudflare token in ~/.cloudflare.env is DEAD (9109) and belongs to the wrong account (433b007f9... vs the owner's 30ed3d82b...). No deploy can succeed until a new one is supplied.
- deploy-produsa.sh step 4 (the DNS CNAME) always fails, silently, and is harmless - step 3 attaching the Pages custom domain is what creates the routing.
- If <app>.pages.dev is taken globally Cloudflare assigns a suffixed name; step 4 would write a CNAME pointing at someone else's project.
- No headless browser on this box: visual rendering has never been verified and cannot be. Verify builds, sha256 parity with dist/, and HTTP 200 instead.
- The WebGL hero gate in src/lib/useWebglOk.js (>=768px AND no prefers-reduced-motion) keeps a ~1 MB three+drei chunk off phones. Keep it.
- Product copy is preserved verbatim from the originals; the honest-limitation sections are the brand voice, not filler.
- Pre-React originals at /root/sites/{optimiza,aether}/ are the rollback - do not delete them.
