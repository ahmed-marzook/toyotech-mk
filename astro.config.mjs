// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Served from the custom domain (public/CNAME), so no `base` subpath.
export default defineConfig({
  site: 'https://toyotech.co.uk',
  // Pages build to /services/index.html etc., so the trailing-slash URL is the
  // real one — keeps canonical URLs, sitemap entries and og:url identical.
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
