# VOIDKIN / DROP 001

Mobile-first conceptual streetwear storefront. Static site + Vercel Node.js Function to send order requests into a private Telegram chat.

## Run locally

Static assets can be served with `python -m http.server 8080` for UI review. To test `/api/order` with Vercel's function routing, run `npx vercel dev` in a linked project; the API route will not work on plain HTTP static servers.

## Deploy

1. Create a GitHub repository for the brand and add these files in its root.
2. Import the GitHub repository into Vercel. Framework preset: Other (no build command).
3. Create a bot with `@BotFather` and get the bot token. Start the bot from the Telegram account or group that should receive new orders.
4. Get the recipient chat ID from Telegram's `getUpdates` (or use a trusted chat ID lookup tool). Set encrypted Vercel environment variables for **Production** and **Preview**:
   - `TELEGRAM_BOT_TOKEN` — BotFather API token (keep secret; never commit to GitHub).
   - `TELEGRAM_CHAT_ID` — your numeric personal or group chat ID. In groups, add the bot and grant it permission to post.
5. Redeploy after saving the variables. Send a sample order and verify the actual Telegram message.

### Important before launch

- Product names, descriptions and €49 prices are illustrative and must be confirmed or changed in **both** `app.js` and `api/order.js` before accepting real requests. A production version should centralize catalog pricing in a shared data source.
- Review stock status and sizing; update the photographic images with final samples, if needed.
- Add the legal seller identity, customer contact address, privacy notice, delivery policy and returns/withdrawal policy applicable to your business and selling locations.
- No payment is processed automatically. Orders are requests only and need manual confirmation via Telegram.
- Telegram chat contains customer name, username/email and shipping country. Limit who can access it and set a retention policy.
- Anti-spam: simple origin and honeypot checks are included. Before public advertising, implement durable rate limiting/bot protection (and monitoring) to limit Telegram API abuse.
- Static UX supports basic keyboard and screen reader interaction, but run accessibility and device QA before launch.

## Files

- `index.html` — homepage, editorial, storefront, checkout dialogs.
- `styles.css` — responsive design.
- `app.js` — product catalog, bag, order form.
- `api/order.js` — validated order relay to Telegram; prices are recomputed on the server.
- `assets/*.webp` — supplied VOIDKIN visuals optimized for web.