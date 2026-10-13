// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/site.config.ts';
import { rehypeCv } from './src/plugins/rehype-cv.mjs';
import search from './src/integrations/search.mjs';

export default defineConfig({
  site: site.url,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      // Link each page to its other-language version where the same path exists
      i18n: {
        defaultLocale: site.defaultLocale,
        locales: Object.fromEntries(Object.entries(site.locales).map(([code, l]) => [code, l.htmlLang])),
      },
    }),
    search(site),
  ],
  markdown: {
    rehypePlugins: [rehypeCv],
    shikiConfig: {
      themes: { light: site.codeTheme.light, dark: site.codeTheme.dark },
      wrap: true,
    },
  },
});
