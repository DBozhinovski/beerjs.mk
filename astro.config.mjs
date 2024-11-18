import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
    compress({
      svg: false,
      html: false,
      css: false,
      js: false,
    }),
    icon(),
  ],
  i18n: {
    defaultLocale: "mk",
    locales: ["mk", "en"],
  },
  site: "https://beerjs.mk",
});
