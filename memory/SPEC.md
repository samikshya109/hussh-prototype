# hussh landing page — SPEC

Single landing page for hussh (ivory + pastel "Tour" style with dark AI-tools/closing band), built from the user's
reference screenshot ("sample page.webp"). Older design versions (V1–V4, version switcher) were removed.

## Page `/` (top → bottom, section ids)
1. Skip link ("Skip to main content" → #main). Nav (light ivory, frosted on scroll): 5 dropdowns, search dialog, account icon
   (→ /sign-in, or Clerk user menu when signed in), "Get Agent One"; mobile drawer with Sign in / Sign out.
2. `#top` Hero fills the first screen (min-h 100svh, equal 80px/60px gaps). Quick-links scroll the matching product card to centre and
   spotlight it (gold ring, data-highlighted=true for ~2.6s) via HIGHLIGHT_EVENT / hashchange.
3. `#products` bento: `#agent-one`, `#puppy-one`, `#tag-one` (Tag One early-access email form).
4. `#how-it-works` StepShowcase (heading + steps left, phone on a sky panel right, vertically centred): 4 tabs (Download, Sign in with Google or Apple, Choose what to connect, Morning brief) + phone mock.
   Auto-advances every 6s while visible; "Pause the tour" toggle; stops once a step is picked or the screen is used.
5. Comparison (dark ink band with contour lines, white table card): semantic <table> hussh vs typical cloud AI (Yes/No text beside icons).
6. `#marketplace` USP bento (no step tour): 4 cards (market-usp-share/price/approve/earn) with decorative mini illustrations
   (toggles, $12 price slider art, approve/decline request card, $57 earnings bars) + "in preview" note linking #get-started.
7. `#ecosystem` light "Four rings" diagram (You / Your device / Encrypted vault / Consent shield) with AI brand chips
   (logos in /public/brands from @lobehub/icons-static-svg, Siri uses Apple mark); legend buttons highlight rings.
8. `#get-started` dark closing CTA + Agent One email signup. Footer.

## Brand
- Colors: ink #1f1f22, white #ffffff, gold #e8b56b, gold-2 #c98a3e (gold-deep #8a5c14 for small gold text on light).
- Nav is always dark (#1f1f22) with logo "hu" white + "ssh" gold gradient, gold "Get Agent One" pill. Dropdowns are dark panels
  (featured column with group icon, blurb, "Get Agent One, free" link + 2-line link list); Company/For Business align right.
- Headers: every section uses SectionPill (dot + label) + H2 (text-4xl/sm:text-5xl bold) + SUB (17px) from Brand.tsx.
- Section rhythm: every section py-[60px] mobile / sm:py-24 (96px); hero gaps below nav equal 96/60. Hero badges drift (motion loops).
- Puppy One image has no Apple logo. Closing CTA button = same gold pill + glow as the nav CTA.
- All section headings left-aligned on the same 1240px container (px-5/sm:px-8); intro paragraph stacked under the heading.
- Closing CTA has flowing contour lines (WaveLines SVG) behind a translucent card. Comparison renders as cards on mobile (<640px).

## Accessibility (WCAG 2.1 AA)
- Global :focus-visible ring (ink outline + white halo), MotionConfig reducedMotion="user", min 12px text, ≥4.5:1 text contrast,
  44px targets on nav/CTAs, labelled inputs with aria-describedby, tablists with arrow-key support, pause control for auto-advance.

## Auth (Emergent-managed Clerk)
- Email + password and Google. Pages `/sign-in/*`, `/sign-up/*` (Clerk components). No roles/admin.
- backend/clerk_auth.py: GET /api/clerk/config, /api/__clerk relay (prod only), require_user dependency (unused yet).
- Frontend: components/auth/ClerkAuthProvider.tsx (renders page even before config; `useAuthStatus()`),
  components/auth/AccountButton.tsx.

## Data model
- `signups` collection: {id, email (lowercased), source: "agent_one" | "tag_one", created_at}. Unique (email, source).
- POST /api/signups {email, source} → 201; 409 duplicate; 422 invalid.

## Design kit
- /downloads/hussh-design-kit.zip (built by /app/scripts/build_design_kit.mjs): @2x full-page + per-section PNGs (desktop 1440, mobile 390),
  image assets, brand SVGs, tokens.json, README with Figma (html.to.design) import steps. Rebuild after design changes.
