# Defne & Onat Wedding App

A beautiful wedding invitation website with RSVP functionality.

**Live Site:** https://defneonat.com

## Features

- 💍 Bilingual support (English & Turkish)
- 🌐 Auto-detects browser language
- 📝 RSVP form with Google Sheets integration
- 📸 Photo upload via Cloudinary
- 📊 Analytics via Cloudflare
- 📱 Mobile responsive

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## Dependency maintenance

[Dependabot](.github/dependabot.yml) checks npm dependencies weekly. Minor and
patch version updates are grouped; major updates stay separate. Security updates
run independently when GitHub detects a vulnerable dependency. Validate updates
with a type-check and production build before deploying.

## Deploy

To deploy to GitHub Pages:

```bash
npm run deploy
```
