import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
import compress from "astro-compress";

import icon from "astro-icon";
import node from "@astrojs/node";
import react from "@astrojs/react";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    compress(),
    icon(),
    react({ include: /node_modules\/(?:@emdash-cms|emdash)\// }),
    emdash({
      database: sqlite({ url: "file:./data/emdash.db" }),
      storage: local({
        directory: "./data/uploads",
        baseUrl: "/_emdash/api/media/file",
      }),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: ["400 800"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic"],
      fallbacks: ["monospace"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter-sans",
      weights: ["300 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic"],
      fallbacks: ["sans-serif"],
    },
  ],
  i18n: { defaultLocale: "mk", locales: ["mk", "en"] },
  site: "https://beerjs.mk",
  compressHTML: true,
});
