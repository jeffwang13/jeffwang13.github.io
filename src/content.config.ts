import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      featured: z.boolean().default(false),
      links: z
        .object({
          github: z.string().url().optional(),
          demo: z.string().url().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
