import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { localeFromParam, localeParams, t } from '../../lib/i18n';
import { entriesIn, entryUrl } from '../../lib/content';

export const getStaticPaths = localeParams;

export async function GET(context: APIContext) {
  const locale = localeFromParam(context.params.locale);
  const L = t(locale);
  const posts = await entriesIn('posts', locale);
  return rss({
    title: L.title,
    description: L.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: entryUrl('posts', p.id),
    })),
    customData: `<language>${L.htmlLang}</language>`,
  });
}
