// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/site.config.ts';
import { rehypeCv } from './src/plugins/rehype-cv.mjs';

export default defineConfig({
  site: site.url,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeCv],
    shikiConfig: {
      themes: { light: site.codeTheme.light, dark: site.codeTheme.dark },
      wrap: true,
    },
  },
});
