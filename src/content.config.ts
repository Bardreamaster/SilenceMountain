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
      category: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** External site for big projects, e.g. https://foo.project.weijinqi.com */
      url: z.string().url().optional(),
      featured: z.boolean().default(false),
      translationKey: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts, pages, projects };
