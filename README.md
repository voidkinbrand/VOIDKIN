# VOIDKIN / Archive 01

Static multipage shop with actual uploaded product photography. Original visual direction retained, excess functionality removed. No runtime Tailwind, fabricated product visuals, fake stock/reservation status, simulated checkout, or photo uploader.

## Contents
- `index.html` — collection / editorial landing
- `shop.html` — filterable product register (type, model/flat)
- `product.html?id=tee_violence` — product galleries, size selection and Telegram inquiry
- `case-files.html`, `about.html`, `info.html` — editorial and buyer information
- `data/products.json` — SINGLE point of truth for names, prices, sizes, color, images, and subject text
- `styles.css`, `app.js` — lightweight responsive implementation
- `assets/products/*.webp` — ONLY the user-supplied garment images, not AI illustrations

## Storefront audit improvements
- Combined category and **color filters** with reset.
- Desktop FRONT/BACK respects manually selected view.
- Keyboard controls for gallery thumbnails and clearer disabled-order state.
- Case Files now pair the original artworks with user-supplied photographs.
- Security response headers, product JSON caching rules and follow-up QA notes are in `vercel.json` and `AUDIT.md`.

## Update a product
Edit `data/products.json`. Prices, sizes, image sources and other data change in the UI after the next Git commit / Vercel deployment. Size and stock are intentionally provisional until verified. This is a catalog and Telegram inquiry flow, not a payment checkout.

## Important caveats for launch
- The Telegram deep link `https://t.me/voidkin_bot?start=<id>_<size>` passes a payload to the bot only when a customer clicks Start; the bot must process that payload. No reservation/payment is performed on the site.
- Confirm actual prices, inventory, fabric specifications, measurements and fulfillment policies. Enter the seller's legal identity, contact and returns address before paid sales.
- Check bot behavior in an actual Telegram session. User-submitted information is not sent to any web server from this site.
- Replace the simple letter favicon and typographic header with the authentic brand SVG when available.
- In local development, use a web server because the catalog is loaded with fetch: `python -m http.server 8000`.

## Audit changes
- Removed Tailwind CDN in production, SVG product drawing generators, fake upload controls, unverified bot status, irrelevant stock promises, unsupported shipping claims, animation-heavy grain, marquee and visual gradients.
- Added semantic links, accessible view controls, mobile menu, dark/light theme, lazy image loading, meta tags, meaningful alt text, focus states, smaller image files, robust missing-file handling.

## Mobile UI (revision 03)

Simplified header with Shop and Menu, theme switch inside the mobile menu, photo-first hero, two-column mobile product register, compact filters, and product title/price above the gallery. Unicode emoji and decorative arrow symbols were removed from visible page copy. Product data and photographs were not changed.
