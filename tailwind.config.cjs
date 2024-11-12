/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      jetbrains: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      colors: {
        bblack: '#0F0D0E',
        bpink: '#E590A3',
        bblue: '#53B2E0',
        byellow: '#F2BD4C',
        borange: '#EB7C3E',
        bpurple: '#765FA2',
        bgreen: '#4DA663',
        bbg: '#1e1e1e',
        bred: '#DA3A44',
        bwhite: '#FDF8ED',
        bgrey: '#343433',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
