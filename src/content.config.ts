import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseFields = {
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  // Optional custom permalink. If present, it overrides the auto-generated id.
  slug: z.string().optional()
};

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    ...baseFields,
    cover: z.string().optional()
  })
});

const essay = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essay' }),
  schema: z.object({
    ...baseFields,
    cover: z.string().optional()
  })
});

const bits = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bits' }),
  schema: z.object({
    // Bits can be untitled.
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    slug: z.string().optional(),

    // Optional media for card display.
    image: z.string().optional()
  })
});

const kids = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kids' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional()
  })
});

export const collections = { posts, essay, bits, kids };
