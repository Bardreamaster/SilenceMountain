// /llms.txt: a plain-Markdown map of the site for AI tools (https://llmstxt.org).
import type { APIRoute } from 'astro';
import site from '../site.config';
import { excerpt, href, locales, t } from '../lib/i18n';
import { entriesIn, entryUrl } from '../lib/content';

const abs = (path: string) => new URL(path, site.url).href;

export const GET: APIRoute = async () => {
  const main = t(site.defaultLocale as (typeof locales)[number]);
  const out = [`# ${main.title}`, '', `> ${main.description}`, ''];
  out.push(locales.map((l) => `${t(l).label}: ${abs(href(l))}`).join(' · '), '');
  for (const l of locales) {
    const L = t(l);
    const label = (path: string, fallback: string) => L.nav.find((n) => n.href === path)?.label ?? fallback;
    const posts = await entriesIn('posts', l);
    const projects = await entriesIn('projects', l);
    const pages = (await entriesIn('pages', l)).filter((p) => !p.id.endsWith('/home'));
    if (posts.length) {
      out.push(`## ${label('/posts/', 'Posts')} (${L.label})`, '');
      for (const p of posts) out.push(`- [${p.data.title}](${abs(entryUrl('posts', p.id))}): ${p.data.description ?? excerpt(p.body, 100)}`);
      out.push('');
    }
    if (projects.length) {
      out.push(`## ${label('/projects/', 'Projects')} (${L.label})`, '');
      for (const p of projects) out.push(`- [${p.data.title}](${p.data.url ?? abs(entryUrl('projects', p.id))}): ${p.data.summary}`);
      out.push('');
    }
    if (pages.length) {
      out.push(`## ${L.label}`, '');
      for (const p of pages) out.push(`- [${p.data.title}](${abs(entryUrl('pages', p.id))})${p.data.description ? `: ${p.data.description}` : ''}`);
      out.push('');
    }
  }
  if (site.aiCrawlers === 'block') return new Response(null, { status: 404 });
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
