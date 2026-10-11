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
