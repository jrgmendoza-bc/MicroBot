# Microbot Website (React redesign)

Official website for **Microbot** — Philippine-made electronics, robotics and STEM learning products.
Same pages, buttons, links and colour scheme as the original site, rebuilt in React with a cleaner, more futuristic look.

## Develop
```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # serve the build locally
```

## Structure
- `index.html` / `product-detail.html?id=<id>` — same two URLs as the original static site (links keep working).
- `src/data/products.js` — **all content lives here**: products, prices, Shopee links, docs, news, services, contacts.
- `src/components/` — Header, Hero, News, Products, Showcase, About, ProductDetail, Footer.
- `src/styles/main.css` — design tokens (`:root`) and all styling. Brand orange is `--accent: #ff5b31`.
- `public/assets/` — images (WebP) and product PDFs (`assets/docs/`).

## Add a product
Add an entry to `PRODUCTS` in `src/data/products.js` (first image is the card thumbnail) and drop its images in `public/assets/images/Products/<Name>/`.

## Deploy
Push to `main`; the included GitHub Actions workflow builds and publishes to GitHub Pages
(Settings → Pages → Source: *GitHub Actions*). Build output uses relative paths, so it works under `/web/`.

## Links
Shopee: https://shopee.ph/microbot.ph · Facebook: https://www.facebook.com/microbot.ph · Email: microbot.ph@gmail.com

© Microbot. All rights reserved.
