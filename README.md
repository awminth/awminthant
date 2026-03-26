# Aw Min Thant — Portfolio

React + Vite + Tailwind portfolio. Live deploy via **GitHub Pages** (see below).

## Local

```bash
npm install
npm run dev
```

Build: `npm run build` · Preview: `npm run preview`

## GitHub + deploy (first time)

1. On [github.com/new](https://github.com/new), create a repository (e.g. `portfolio`). **Do not** add a README (this repo already has one).
2. In this folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open **Actions** — the workflow **Deploy to GitHub Pages** runs on every push to `main`. When it finishes, the site is at:

`https://YOUR_USERNAME.github.io/YOUR_REPO/`

The build uses base path `/<repo-name>/` automatically so assets load correctly.

## Profile photo & CV (privacy)

Your portrait and CV live in `public/` under **non-obvious filenames** (`x9k2m7f4q8nb.png`, `z3p8w1r6yk4v.pdf`) so the GitHub file tree does not shout `profile.png` / `resume.pdf`. The site still loads and downloads them correctly (`Download CV` saves as `Aw_Min_Thant_Resume.pdf`).

- To keep these files out of a **public** GitHub repo listing, use a **private** repository (GitHub still deploys Pages; your live site URLs can still be opened by anyone who knows the link—same as any public website).
- To replace them: drop new files on top of those two paths (same names) or change the names in `src/App.tsx` (`PROFILE_IMAGE_SRC` / `RESUME_ASSET_URL`).

## Optional: Gemini

If you use features that need it, copy `.env.example` to `.env` and set `GEMINI_API_KEY`.
