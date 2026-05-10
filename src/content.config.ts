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
          demo: z.string().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

// Shared schema for /music and /sports — same Timeline shape.
const timelineSchema = ({ image }: { image: () => z.ZodType }) =>
  z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string().optional(),
    notes: z.string().optional(),
    youtubeId: z.string().optional(),
    instagram: z.string().url().optional(),
    cover: image().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  });

const music = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/music' }),
  schema: timelineSchema,
});

const sports = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sports' }),
  schema: timelineSchema,
});

const travel = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/travel' }),
  schema: timelineSchema,
});

export const collections = { projects, music, sports, travel };
