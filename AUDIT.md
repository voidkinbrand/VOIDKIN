# VOIDKIN — storefront audit and remediation / 31 October 2026

## Scope

Reviewed the supplied single-file source code, the user-supplied photographic assets, the deployed GitHub/Vercel workflow, and the new storefront's local interaction scenarios. The audit is grounded in the available code; it is **not** an independent assessment of manufacturing, supplier specifications, Telegram bot behavior, sales compliance, or actual payment processing.

## Findings and fixes

| Severity | Finding in prior site | Remediation |
| --- | --- | --- |
| High | Text stated that bot was online, answered in under a minute, and reserved stock; the HTML/deep link did not implement or verify those actions. | Changed CTAs to **inquiries**; explicitly explain that Telegram opening is not order confirmation, a reservation or payment. |
| High | Fixed claims about stock, worldwide delivery, returns, manufacturing, materials and technical properties were unverified. | Replaced with provisional pricing/size status and explicit confirmation language; removed fabricated stock/reservation/delivery claims. |
| High | Outdated checkout/API files and a different parallel page design remained in the repo. | Removed redundant older pages, API and duplicated assets; one coherent UI now serves all destinations. |
| Medium | Browser-only FileReader image uploader falsely resembled persistent admin functionality. | Removed; photographic sources are now maintained in actual files and one JSON catalog. |
| Medium | Extensive SVG garment/photo generators still existed despite real photography. | Removed; only uploaded product photos and technical drawings are used. |
| Medium | Runtime Tailwind CDN, animation-heavy grain, gradients, ticker, dense red UI. | Self-contained CSS/JS with restrained palette, consistent typography, no external runtime styles. |
| Medium | Clickable generic cards and modal interactions had incomplete keyboard affordances and focus handling. | Semantic linked product pages, real toggle buttons with `aria-pressed`, visible focus states, accessible mobile navigation and a no-modal product flow. |
| Medium | Hard-coded catalog data and styling across multiple unrelated interfaces. | Product title, price, sizes, color, photos and editorial copy are centralized in `data/products.json`. |
| Low | Hero/images lacked explicit priority/decode hints; excessive presentation JS. | Hero `fetchpriority=high`, lazy/deferred product images, compressed WebP assets, reduced JS. |
| Low | Preview meta tags referred to an unverified domain or stock placeholder. | Canonical Vercel URL and OG thumbnail from supplied photograph. |

## Automated local verification

- HTML structure and local links checked for pages; no duplicate IDs or missing static paths.
- `node --check app.js` passes.
- Playwright Chromium verified 320px, 375px, 768px, 1024px and 1440px layouts for the home, shop, About, Case Files and Info pages. No horizontal overflow or uncaught JS errors were observed in these tests.
- Tested categories (all/tees/hoodie), model/flat view, front/back flips and mobile navigation.
- Tested all five product IDs plus missing IDs; gallery tabs and selected-size Telegram deep links worked in local tests.
- WebP sources: 28 files, approximately 1.06 MB combined. CSS ~20 KB and JS ~12 KB before transfer encoding.
- Color checks: muted text contrast on light surfaces ~5.0–5.5:1, muted text on dark ~8–9:1. Signal red is used as non-text accent rather than small body text.

## Unresolved pre-sale tasks

1. Confirm product prices, fabric content, authentic measurements and stock; **the current data is provisional**.
2. Verify the real `@voidkin_bot` receives and processes `/start <item>_<size>` reliably. A Telegram deep link by itself does not submit an order.
3. Publish legal seller identity, contact and return address; agree on delivery / withdrawal terms before collecting money.
4. Replace provisional typographic mark/favicon with the brand's authentic vector asset when supplied.
5. Check the host's commercial-use plan and actual website performance against live traffic (Lighthouse/Web Vitals). Local browser tests do not establish live conversion or uptime.
6. The desktop screenshots and automated tests used locally reconstructed browser resources because direct browser navigation was restricted in this environment. Production deployment status is checked separately through Vercel.
