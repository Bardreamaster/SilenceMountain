import site, { type Locale } from '../site.config';

export const locales = Object.keys(site.locales) as Locale[];
export const defaultLocale = site.defaultLocale as Locale;

export function t(locale: Locale) {
  return site.locales[locale];
}

/** Route params for `[...locale]` pages: undefined = default locale at "/" */
export function localeParams() {
  return locales.map((l) => ({ params: { locale: l === defaultLocale ? undefined : l } }));
}

export function localeFromParam(param: string | undefined): Locale {
  return (param ?? defaultLocale) as Locale;
}

/** Build a URL inside a locale: href('zh', '/posts/') -> '/zh/posts/' */
export function href(locale: Locale, path = '/'): string {
  if (/^[a-z]+:/i.test(path)) return path; // external link
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean}`;
}

/** Entry ids look like "en/my-post"; split them into locale and slug */
export function splitId(id: string): { locale: Locale; slug: string } {
  const [locale, ...rest] = id.split('/');
  return { locale: locale as Locale, slug: rest.join('/') };
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(t(locale).htmlLang, { ...t(locale).dateFormat, timeZone: 'UTC' });
}

/**
 * The current page in each other language.
 * `exact` = the same content exists there (a translation, or a list page every language has);
 * otherwise `url` is the section the entry belongs to, a sensible place to land.
 * Pass `alternates` on entry pages (posts, projects, pages), leave it out on list pages.
 */
export function languageLinks(pathname: string, locale: Locale, alternates?: Partial<Record<Locale, string>>) {
  const current = pathname.replace(/\/?$/, '/');
  const rest = locale === defaultLocale ? current : current.slice(`/${locale}`.length) || '/';
  const out = {} as Record<Locale, { url: string; exact: boolean }>;
  for (const l of locales) {
    if (l === locale) out[l] = { url: href(l, rest), exact: true };
    else if (alternates?.[l]) out[l] = { url: alternates[l]!, exact: true };
    else if (alternates) out[l] = { url: href(l, rest.replace(/[^/]+\/$/, '')), exact: false };
    else out[l] = { url: href(l, rest), exact: true };
  }
  return out;
}

/** Plain-text summary of a Markdown body, for pages without a description */
export function excerpt(markdown = '', length = 140): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}
