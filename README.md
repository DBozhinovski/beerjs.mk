# 🍻 BeerJS Skopje Website 🍻

_Version 5.0.0_

## Getting Started

### Requirements

- Node.js 22.16 or later
- pnpm 11.24.0

### Running locally

1. Install the dependencies with `pnpm install`.
2. Import the content into a new local database with `pnpm cms:import`.
3. Start the dev server with `pnpm dev`.

The import downloads the post images from `https://beerjs.mk/img/`, so it needs a network connection.

## Stack

The latest version of the website is built with:

- [Astro](https://astro.build/), as a Node.js server with `@astrojs/node`
- [EmDash](https://github.com/emdash-cms/emdash), for the content and the admin
- [TailwindCSS](https://tailwindcss.com/)

### Project structure

The project follows what you'd expect from a standard Astro directory structure:

- `src/pages/` contains the source code for the website pages (i.e. routes).
  - The internationalized pages (the 'en' locale) are their own set of routes, found in `src/pages/en/`. These mirror the ones in the root, for the most part. This is an Astro recommendation.
- `src/components/` contains shared UI components, also Astro files.
- `src/layouts/` contains the layout components for the website.
- `src/i18n/` contains the internationalization files, and utilities.
- `src/lib/content.ts` reads the content from EmDash.
- `src/components/content/` renders the Portable Text of the posts.
- `seed/seed.json` contains the EmDash content model and the one-time import of the former Markdown posts.

## Content

Edit all content in the EmDash admin at `/_emdash/admin/`.
The SQLite database at `data/emdash.db` is the source of truth. Uploaded files are in `data/uploads/`.
Git does not track the `data/` folder.

| Content | EmDash collection | URL |
| --- | --- | --- |
| Announcements | `announcements` | `/announcements/{slug}` |
| Blog posts | `blog` | `/blog/{slug}` |
| Event recaps | `events` | `/events/{slug}` |
| About, contact, press kit, take part | `pages` | `/{slug}` |
| Social links in the header and footer | `social_links` | none |

Each entry has a Macedonian (`mk`) version. An English (`en`) translation is optional. The site serves it under `/en`.
The site reads published content at request time, so a change in the admin shows without a rebuild.

Change the content model in `seed/seed.json`, not in the admin.
Then run `pnpm cms:import`. It adds new collections and fields and skips the entries that exist.

### Keep the local and production databases in sync

Production is the source of truth for content.

1. Write and edit content only in the production admin at `https://beerjs.mk/_emdash/admin/`.
2. Stop the local dev server with `pnpm astro dev stop`.
3. Run `pnpm cms:pull` to copy the production database and uploads to `data/`.

`pnpm cms:pull` keeps the previous local database in `data/backups/`.
It reads `CMS_REMOTE` (the SSH target) and `CMS_APP` (the Coolify application UUID) from `.env`.
It does not change production content.

Never copy a local database to production. It contains the development admin account.

## Deployment

The `Dockerfile` pins Node.js 24.22.1 and pnpm 11.24.0.
It keeps the application directory at `/app`, so the existing data volume remains valid.
The `.dockerignore` excludes local databases, uploads, secrets, and generated files.
The current Coolify Nixpacks configuration does not use this Dockerfile.
Before you change the build pack, publish the reviewed Dockerfile through an authorized source update.

| Coolify setting | Value after the authorized source update |
| --- | --- |
| Build pack | Dockerfile |
| Dockerfile location | `/Dockerfile` |
| Build context | repository root |
| Port | `80` |
| Persistent storage | a volume mounted at `/app/data` |

Set these environment variables:

| Variable | Value | Build | Runtime |
| --- | --- | --- | --- |
| `EMDASH_SITE_URL` | `https://beerjs.mk` | yes | yes |
| `HOST` | `0.0.0.0` | no | yes |
| `PORT` | `80` | no | yes |
| `EMDASH_ENCRYPTION_KEY` | the output of `pnpm exec emdash secrets generate` | no | yes |

`EMDASH_SITE_URL` must be set at build time. Without it, the build does not allow image transforms for media, and the site serves the original image files.
Keep the same `EMDASH_ENCRYPTION_KEY` across deployments. The standalone server does not read `.env`, so Coolify must inject the variables.

### First production setup

1. Configure the settings, the volume, and the variables above.
2. Deploy the application.
3. Open `https://beerjs.mk/_emdash/admin/`. The setup wizard starts.
4. Keep the sample content selected. The wizard imports `seed/seed.json`, which `package.json` names in `emdash.seed`.
5. Register the administrator passkey on `https://beerjs.mk`. The passkey works only on the domain in `EMDASH_SITE_URL`.

The import downloads the post images from `https://beerjs.mk/img/`. The new server serves these files from `public/img/`.

## Contributing

See the [CONTRIBUTING](CONTRIBUTING.md) file for details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
