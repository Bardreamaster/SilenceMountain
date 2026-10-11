import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../site.config';
import { href, locales, splitId } from './i18n';

type Name = 'posts' | 'pages' | 'projects';

const isProd = import.meta.env.PROD;

/** All entries of a collection in one locale, newest first when dated */
export async function entriesIn<N extends Name>(name: N, locale: Locale) {
  const all = (await getCollection(name)) as CollectionEntry<N>[];
  return all
    .filter((e) => splitId(e.id).locale === locale)
    .filter((e) => !(isProd && 'draft' in e.data && e.data.draft))
    .sort((a, b) => {
      const da = 'date' in a.data ? (a.data.date as Date).valueOf() : 0;
      const db = 'date' in b.data ? (b.data.date as Date).valueOf() : 0;
      return db - da;
    });
}

const base: Record<Name, string> = { posts: '/posts/', pages: '/', projects: '/projects/' };

export function entryUrl(name: Name, id: string) {
  const { locale, slug } = splitId(id);
  return href(locale, `${base[name]}${slug}/`);
}

/**
 * Links to the same entry in other languages, keyed by locale.
 * Locales without a translation are left out.
 */
export async function translationsOf(name: Name, entry: CollectionEntry<Name>) {
  const out: Partial<Record<Locale, string>> = {};
  const key = entry.data.translationKey;
  if (!key) return out;
  const all = (await getCollection(name)) as CollectionEntry<Name>[];
  for (const other of all) {
    const { locale } = splitId(other.id);
    if (other.id !== entry.id && other.data.translationKey === key && locales.includes(locale)) {
      out[locale] = entryUrl(name, other.id);
    }
  }
  return out;
}
