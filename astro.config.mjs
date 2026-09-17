// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://ahmed-marzook.github.io/toyotech-mk/
// If a custom domain is added later, set `site` to it and remove `base`.
export default defineConfig({
  site: 'https://ahmed-marzook.github.io',
  base: '/toyotech-mk',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
