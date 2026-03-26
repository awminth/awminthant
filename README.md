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

## Tech stack

- React 19, TypeScript, Vite 6  
- Tailwind CSS v4 (`@tailwindcss/vite`)  
- `lucide-react` icons  
