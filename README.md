# VOIDKIN DROP 01 — original user code + actual product imagery

This edition preserves the user-provided single-page HTML storefront and replaces all dynamically generated garment visuals with the nine uploaded photos and technical sketches.

- `index.html`: the original HTML/CSS/JS, product catalog, product modal, front/back toggle, size chart, and Telegram deep links.
- `assets/products/`: cropped, compressed WebP images created from the user-supplied photographs and original two-sided flat sketches.
- `assets/og-voidkin.jpg`: OpenGraph preview cropped from the supplied burgundy tee photograph.

## Preview
Serve the folder with `python -m http.server 8000`. No build step is required.

## Telegram note
The link `https://t.me/voidkin_bot?start=<item>_<size>` opens a bot with a start parameter. It does **not** automatically reserve inventory or send an order to the brand unless that bot has an appropriate handler. Confirm the bot username and implement `/start` parsing in the bot before accepting real orders.

## Product data
In this edition product prices and sizes remain in the `PRODUCTS` array in `index.html`, consistent with the original user code. Technical composition/weight and availability have not been verified independently.
