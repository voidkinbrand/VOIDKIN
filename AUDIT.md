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


## Second audit / follow-up revision

### Additional defects identified

- A manual FRONT/BACK selection could be contradicted by desktop hover CSS. Hover now only previews the back when the card has not been manually flipped; once the user chooses the back it remains visible until toggled.
- Shop lacked the originally requested color filter. An accessible color selector now derives its values from the same product JSON and combines with garment-type and photo-view filters; RESET clears incompatible selections.
- Disabled size inquiry link remained in keyboard tab sequence before selecting a size. It is now removed from tab order until a size has been selected. Gallery thumbnails expose explicit labels and support left/right arrow keys.
- Case Files consisted entirely of text. Each existing case now includes its corresponding genuine garment photograph or flat lay, arranged in an alternating editorial layout; no new graphics or manufactured facts are used.
- Response headers lacked a Content Security Policy, Permissions Policy and catalog revalidation rule. Those are now configured in `vercel.json`.

### Second audit regression suite

- Test widths: **320, 390, 768, 1024, 1440 px**. No horizontal overflow in tested pages, no uncaught JavaScript errors.
- Color filtering, garment filtering, conflicting-filter empty state, RESET, model/flat mode, manual front/back toggles, and mobile nav were tested.
- All five product galleries, selected-size Telegram payloads, thumbnail arrow-key behavior and unknown product ID were tested.
- Verified all 28 original WebP images can be decoded locally, and every referenced local HTML/image path exists.
- Local browser screenshots were rendered with Chromium using a strict in-memory asset route because direct localhost browser navigation is restricted in this environment. This is **not** a live production-browser audit.

### Remaining material dependencies

- The bot still requires an actual Telegram end-to-end test. Telegram deep links alone do not create or reserve orders.
- Seller identity, legal notices, stock, prices, real measurements and fulfillment policies require confirmed brand input. This build intentionally does not invent them.
- Dedicated static HTML metadata for each product and real-user Core Web Vitals measurements are still future SEO/performance opportunities; tests here do not substantiate those outcomes.
