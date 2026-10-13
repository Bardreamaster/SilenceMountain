import { fileURLToPath } from 'node:url';
import * as pagefind from 'pagefind';

/** Languages written without spaces between words, which need word splitting to be searchable */
const CJK = /^(zh|ja|ko)\b/i;

/** Builds the Pagefind search index into dist/pagefind after the site is built. */
export default function search(site) {
  return {
    name: 'site-search',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const langs = Object.values(site.locales).map((l) => l.htmlLang);
        const forceLanguage = site.search.allLanguages
          ? (langs.find((l) => CJK.test(l)) ?? site.locales[site.defaultLocale].htmlLang).toLowerCase()
          : undefined;
        const { index, errors } = await pagefind.createIndex({ forceLanguage });
        if (!index) throw new Error(errors.join('\n'));
        const { page_count } = await index.addDirectory({ path: fileURLToPath(dir) });
        await index.writeFiles({ outputPath: fileURLToPath(new URL('pagefind/', dir)) });
        await pagefind.close();
        logger.info(`indexed ${page_count} pages` + (forceLanguage ? ` as one index (${forceLanguage})` : ' per language'));
      },
    },
  };
}
