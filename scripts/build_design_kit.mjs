// Builds the hussh design kit: retina full-page + per-section screenshots (desktop & mobile),
// raw image assets, brand logos, tokens and a Figma import guide, zipped into frontend/public/downloads.
// Run: cd /app/tests && PLAYWRIGHT_BROWSERS_PATH=/pw-browsers node /app/scripts/build_design_kit.mjs
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const URL = process.env.KIT_URL || "http://localhost:3000/";
const OUT = "/tmp/hussh-design-kit";
const SECTIONS = [
  ["01-hero", '[data-testid="home-hero"]'],
  ["02-products", '[data-testid="products-section"]'],
  ["03-how-it-works", '[data-testid="home-how"]'],
  ["04-comparison", '[data-testid="home-compare"]'],
  ["05-marketplace", '[data-testid="home-marketplace"]'],
  ["06-ai-rings", '[data-testid="home-ecosystem"]'],
  ["07-closing-cta", '[data-testid="home-cta"]'],
  ["08-footer", '[data-testid="site-footer"]'],
];

fs.rmSync(OUT, { recursive: true, force: true });
for (const d of ["desktop/sections", "mobile/sections", "assets/images", "assets/brand-logos"]) fs.mkdirSync(path.join(OUT, d), { recursive: true });

const browser = await chromium.launch();
for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  // Reveal every scroll-triggered animation, then return to the top.
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(80); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  // Fixed header would repeat inside section crops; pin it to the document for full-page capture.
  await page.addStyleTag({ content: '[data-testid="site-header"]{position:absolute !important}' });
  await page.screenshot({ path: path.join(OUT, name, `hussh-landing-${name}-full@2x.png`), fullPage: true });
  for (const [slug, sel] of SECTIONS) {
    const el = page.locator(sel).first();
    if (await el.count()) await el.screenshot({ path: path.join(OUT, name, "sections", `${slug}@2x.png`) });
  }
  await ctx.close();
}
await browser.close();

// Raw assets
const content = fs.readFileSync("/app/frontend/src/components/hussh/content.ts", "utf8");
const imgs = [...content.matchAll(/(\w+):\s*\n?\s*"(https:\/\/static\.prod-images[^"]+)"/g)];
for (const [, key, url] of imgs) {
  const res = await fetch(url);
  fs.writeFileSync(path.join(OUT, "assets/images", `${key}.jpg`), Buffer.from(await res.arrayBuffer()));
}
for (const f of fs.readdirSync("/app/frontend/public/brands")) fs.copyFileSync(path.join("/app/frontend/public/brands", f), path.join(OUT, "assets/brand-logos", f));
fs.copyFileSync("/app/frontend/public/favicon.svg", path.join(OUT, "assets", "favicon.svg"));

fs.writeFileSync(path.join(OUT, "tokens.json"), JSON.stringify({
  color: {
    ink: "#1F1F22", white: "#FFFFFF", gold: "#E8B56B", gold2: "#C98A3E", goldDeepText: "#8A5C14",
    ivory: "#FAF8F5", ivory2: "#F3EFE6", bodyText: "#45474D", mutedText: "#5B5F68",
    pastel: { bubble: "#F9B8CF", butter: "#FFE08A", coral: "#F26B5B", sky: "#A9CBEF", mint: "#BFE3CF" },
    success: { bg: "#D1FAE5", text: "#065F46" },
  },
  typography: {
    family: { sans: "Plus Jakarta Sans", mono: "IBM Plex Mono" },
    h1: { desktop: "72/1.04 Bold, -4%", mobile: "44/1.04 Bold" },
    h2: { desktop: "48–60/1.04 Bold, -3%", mobile: "36/1.05 Bold" },
    body: "17/1.6 Regular", small: "14–15/1.5", label: "12 Mono Uppercase, +14% tracking",
  },
  layout: { container: 1240, gutter: { desktop: 32, mobile: 20 }, sectionPadding: { desktop: 96, mobile: 60 }, radius: { card: 28, chip: 999, phone: 44 } },
  button: { primary: "Gold #E8B56B pill, text #1F1F22, min-height 44", dark: "Ink #1F1F22 pill, white text" },
}, null, 2));

fs.writeFileSync(path.join(OUT, "README.md"), `# hussh landing page: design kit

## What's inside
- desktop/ and mobile/: retina (@2x) full-page PNGs plus one PNG per section (1440px and 390px wide layouts).
- assets/images/: every illustration used on the page (mascot, product scenes), full resolution.
- assets/brand-logos/: AI brand logos as SVG (vector, editable). Third-party marks belong to their owners.
- tokens.json: colours, type scale, spacing, radii and button specs.

## Editing in Figma
1. Fully editable layers (recommended): in Figma, open Plugins > search "html.to.design" > paste the live URL
   ${process.env.PUBLIC_URL || "(your preview URL)"} > choose Desktop 1440 and Mobile 390. It imports real frames,
   text layers, auto-layout and images that you can edit.
2. Quick mock-ups: drag the PNGs from desktop/ and mobile/ onto a Figma canvas, or drop the SVG logos in as vectors.
3. Fonts: install Plus Jakarta Sans and IBM Plex Mono (both free on Google Fonts) so text layers render correctly.
`);
console.log("kit built", fs.readdirSync(OUT));
