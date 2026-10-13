// schema.org structured data, so search engines and AI tools know who wrote what.
import site, { type Locale } from '../site.config';
import { href, t } from './i18n';

const abs = (path: string) => new URL(path, site.url).href;

export function person(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: t(locale).author,
    url: abs(href(locale)),
    sameAs: site.socials.filter((s) => s.href.startsWith('http')).map((s) => s.href),
  };
}

export function website(locale: Locale) {
  const L = t(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: L.title,
    description: L.description,
    url: abs(href(locale)),
    inLanguage: L.htmlLang,
    author: person(locale),
  };
}

export function profilePage(locale: Locale, path: string) {
  return { '@context': 'https://schema.org', '@type': 'ProfilePage', url: abs(path), mainEntity: person(locale) };
}

export function blogPosting(locale: Locale, p: {
  title: string; description: string; path: string; image: string; published: Date; modified?: Date; tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url: abs(p.path),
    mainEntityOfPage: abs(p.path),
    image: abs(p.image),
    datePublished: p.published.toISOString(),
    dateModified: (p.modified ?? p.published).toISOString(),
    inLanguage: t(locale).htmlLang,
    keywords: p.tags?.join(', ') || undefined,
    author: person(locale),
  };
}
