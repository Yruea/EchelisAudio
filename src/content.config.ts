import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    log: z.number(),
    date: z.coerce.date(),
    tag: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { journal };
