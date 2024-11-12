import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const enPosts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/en' }),
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    category: z.enum(['events', 'announcements', 'blog', 'meta', 'press-kit']).optional(),
    author: z
      .object({
        name: z.string(),
        link: z.string(),
        email: z.string(),
      })
      .optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

const mkPosts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/mk' }),
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    category: z.enum(['events', 'announcements', 'blog', 'meta', 'press-kit']).optional(),
    author: z
      .object({
        name: z.string(),
        link: z.string(),
        email: z.string(),
      })
      .optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  en: enPosts,
  mk: mkPosts,
};
