# Developer portfolio (React + Vite + Tailwind)

Single-page portfolio with sections for hero, services, about, portfolio, and contact. Built with **React 19**, **TypeScript**, **Vite 6**, and **Tailwind CSS v4**.

## Project layout

```
portfolio/
├── public/                 # Static assets (served at site root)
│   ├── portfolio-hotel.jpg
│   ├── portfolio-pos.jpg
│   ├── portfolio-school.jpg
│   └── …                   # Add profile.png & resume.pdf here if used by the app
├── src/
│   ├── App.tsx             # Main UI and content
│   ├── main.tsx            # React entry
│   └── index.css           # Tailwind entry + global styles
├── dist/                   # Production build output (from npm run build)
├── node_modules/           # Dependencies (after npm install)
├── index.html              # HTML shell + fonts
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts          # Vite + React + Tailwind; optional GEMINI_API_KEY inject
├── metadata.json
├── .env.example            # Optional env template
├── .github/
│   └── workflows/
│       └── deploy-github-pages.yml
├── .gitignore
└── README.md
```

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm install`  | Install dependencies                 |
| `npm run dev`  | Dev server (port **3009**, all hosts)|
| `npm run build`| Production build → `dist/`           |
| `npm run preview` | Preview the production build    |
| `npm run lint` | Typecheck (`tsc --noEmit`)          |
| `npm run clean`| Remove `dist` (Unix-style `rm -rf`)  |

## Run locally

1. **Prerequisites:** Node.js (LTS recommended)
2. Install: `npm install`
3. Start: `npm run dev` → open the URL shown in the terminal (e.g. `http://localhost:3009`)

## Optional environment

If you use features that need Gemini (see `@google/genai` in `package.json`), copy `.env.example` to `.env` and set `GEMINI_API_KEY`. The portfolio UI does not require it unless you wire API calls yourself.

## Public assets

The app expects these under **`public/`** (paths are root-relative, e.g. `/profile.png`):

- **`profile.png`** — hero portrait (referenced in `App.tsx`)
- **`resume.pdf`** — CV download (referenced in `App.tsx`)

Portfolio thumbnails are already included as `portfolio-*.jpg`. Replace or add files as needed; keep filenames in sync with `App.tsx` if you rename them.

## GitHub Pages deploy

GitHub Pages only serves **static files**. It does **not** run Vite. If you push the raw repo, the site loads `index.html` which points at `/src/main.tsx` — that file is not built for the browser, so you get **404** on `main.tsx`.

**Fix (recommended):** use the included workflow so each push builds `dist/` and deploys that output.

1. Push this repo including `.github/workflows/deploy-github-pages.yml`.
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions** (not “Deploy from a branch” with only source files).
4. Push to `main` or `master`; the **Deploy to GitHub Pages** workflow runs `npm ci` and `npm run build`, then publishes **`dist/`**.

`vite.config.ts` sets **`base`** automatically in CI:

- Repo named `yourname.github.io` → `base: '/'` (site at `https://yourname.github.io/`).
- Any other repo (e.g. `portfolio`) → `base: '/portfolio/'` (site at `https://yourname.github.io/portfolio/`).

**Manual deploy:** run `npm run build` locally, then upload the **contents** of the `dist/` folder to your Pages branch or hosting root — not the `src/` folder.

## Tech stack

- React 19, TypeScript, Vite 6  
- Tailwind CSS v4 (`@tailwindcss/vite`)  
- `lucide-react` icons  
