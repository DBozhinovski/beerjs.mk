import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import partytown from '@astrojs/partytown';

// https://astro.build/config
import compress from 'astro-compress';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    partytown({
      config: {
        debug: true,
      },
    }),
    sitemap(),
    image(),
    mdx(),
    solidJs(),
    compress(),
  ],
  site: 'https://beerjs.mk',
});
