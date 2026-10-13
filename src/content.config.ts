import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every collection is organised as <collection>/<locale>/<slug>.md.
// An entry exists only in the languages you write it in; give two entries the
// same `translationKey` to link them as translations of each other.

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '*/**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    translationKey: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '*/**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    translationKey: z.string().optional(),
    /** "cv" switches to the résumé layout */
    layout: z.enum(['page', 'cv']).default('page'),
    /** Optional PDF linked at the top of a CV page */
    pdf: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*/**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      /** Free-form labels; the projects page offers a filter for each one in use */
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** External site for big projects, e.g. https://foo.project.weijinqi.com */
      url: z.string().url().optional(),
      featured: z.boolean().default(false),
      translationKey: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// Life timeline: travel, museums, events, cities, hobbies, books, films.
const life = defineCollection({
  loader: glob({ base: './src/content/life', pattern: '*/**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      /** For things that span time, e.g. living in a city */
      end: z.coerce.date().optional(),
      type: z.enum(['travel', 'museum', 'event', 'city', 'hobby', 'book', 'film']),
      place: z.string().optional(),
      /** Where it happened, as [latitude, longitude]; puts the entry on the globe */
      coords: z.tuple([z.number(), z.number()]).optional(),
      /** Books and films: 1–5 */
      rating: z.number().min(1).max(5).optional(),
      photos: z.array(image()).default([]),
      link: z.string().url().optional(),
      translationKey: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts, pages, projects, life };
