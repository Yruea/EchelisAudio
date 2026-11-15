import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.echelisaudio.com',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  vite: { build: { sourcemap: true } },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/thanks') })],
});
