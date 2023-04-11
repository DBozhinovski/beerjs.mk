// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)
const en = defineCollection({
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

const mk = defineCollection({
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
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  en,
  mk,
};
