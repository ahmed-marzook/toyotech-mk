// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://ahmed-marzook.github.io/toyotech-mk/
// If a custom domain is added later, set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://ahmed-marzook.github.io',
  base: '/toyotech-mk',
  // Pages build to /services/index.html etc., so the trailing-slash URL is the
  // real one — keeps canonical URLs, sitemap entries and og:url identical.
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
