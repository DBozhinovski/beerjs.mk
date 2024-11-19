# 🍻 BeerJS Skopje Website 🍻

_Version 5.0.0_

## Getting Started

### Requirements

- Node.js v18.17.1+

### Running locally

```bash
npm install
npm run dev
```

## Stack

The latest version of the website is built with:

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shoelace](https://shoelace.style/)

### Project structure

The project follows what you'd expect from a standard Astro directory structure:

- `src/pages/` contains the source code for the website pages (i.e. routes).
  - The internationalized pages (the 'en' locale) are their own set of routes, found in `src/pages/en/`. These mirror the ones in the root, for the most part. This is an Astro recommendation.
- `src/components/` contains shared UI components, also Astro files.
- `src/layouts/` contains the layout components for the website.
- `src/i18n/` contains the internationalization files, and utilities.
- `src/content/` contains the website content, including blog posts, news items, and other static content. It uses the Astro content layer API, introduced in Astro v5 (details in `src/content/config.ts`).

## Contributing

See the [CONTRIBUTING](CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
