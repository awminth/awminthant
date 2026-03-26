import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

/** GitHub Pages project site: https://USER.github.io/REPO/ — set in CI */
function pagesBase(): string {
  if (process.env.GITHUB_PAGES !== 'true' || !process.env.GITHUB_REPOSITORY) {
    return '/';
  }
  const repo = process.env.GITHUB_REPOSITORY.split('/')[1] ?? '';
  return repo ? `/${repo}/` : '/';
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: pagesBase(),
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
