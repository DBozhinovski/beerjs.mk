import {
  getEmDashCollection,
  getEmDashEntry,
  getRequestContext,
  runWithContext,
  type MediaValue,
  type PortableTextBlock,
} from "emdash";
import type { AstroGlobal } from "astro";
import { defaultLang, languages as languageNames } from "../i18n/ui";
import { getLangFromUrl } from "../i18n/utils";

const languages = Object.keys(languageNames);

export const NEWS_COLLECTIONS = ["announcements", "blog", "events"] as const;

/** URL path segments and the collections that they show. */
const ROUTE_COLLECTIONS: Record<string, string> = {
  announcements: "announcements",
  blog: "blog",
  events: "events",
  meta: "pages",
};

export interface PostData {
  title: string;
  description?: string;
  date?: string | Date;
  category?: string;
  image?: MediaValue | null;
  content: PortableTextBlock[];
}

export interface NewsItem {
  collection: string;
  slug: string;
  data: PostData;
  date?: Date;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

function toDate(value: PostData["date"]) {
  if (!value) return undefined;
  return value instanceof Date ? value : new Date(value);
}

/** The URL slug of an entry. EmDash prefixes the ids of non-default locales. */
function entrySlug(id: string, lang: string) {
  return id.startsWith(`${lang}/`) ? id.slice(lang.length + 1) : id;
}

function publishedOnly<T>(read: () => Promise<T>): Promise<T> {
  return runWithContext(
    { ...getRequestContext(), editMode: false, preview: undefined },
    read,
  );
}

export function routeCollection(route: string | undefined) {
  return route ? ROUTE_COLLECTIONS[route] : undefined;
}

/** The path of an entry, with the `/en` prefix for English. */
export function entryPath(lang: string, collection: string, slug: string) {
  const prefix = lang === defaultLang ? "" : `/${lang}`;
  return collection === "pages"
    ? `${prefix}/${slug}`
    : `${prefix}/${collection}/${slug}`;
}

/** One entry in one locale. Drafts show only in an authenticated preview. */
export async function getEntry(collection: string, slug: string, lang: string) {
  const result = await getEmDashEntry<string, PostData>(collection, slug, {
    locale: lang,
  });
  if (result.error) throw result.error;
  const entry = result.entry;
  return {
    post: entry ? { ...entry.data, date: toDate(entry.data.date) } : undefined,
    isPreview: result.isPreview,
  };
}

/** The published news posts in one locale, newest first. */
export async function getNews(lang: string, limit?: number) {
  const results = await publishedOnly(() =>
    Promise.all(
      NEWS_COLLECTIONS.map((collection) =>
        getEmDashCollection<string, PostData>(collection, {
          status: "published",
          locale: lang,
          orderBy: { date: "desc" },
          ...(limit === undefined ? {} : { limit }),
        }),
      ),
    ),
  );
  const news: NewsItem[] = results.flatMap((result, index) => {
    if (result.error) throw result.error;
    return result.entries.map((entry) => ({
      collection: NEWS_COLLECTIONS[index],
      slug: entrySlug(entry.id, lang),
      data: entry.data,
      date: toDate(entry.data.date),
    }));
  });
  news.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  return news.slice(0, limit);
}

/** The published social links, in their configured order. */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const result = await publishedOnly(() =>
    getEmDashCollection<"social_links", Omit<SocialLink, "id">>(
      "social_links",
      {
        status: "published",
        locale: defaultLang,
        orderBy: { position: "asc" },
      },
    ),
  );
  if (result.error) throw result.error;
  return result.entries.map(({ id, data }) => ({
    id,
    name: data.name,
    url: data.url,
    icon: data.icon,
  }));
}

/**
 * The entry for a route in the locale of its URL. A draft preview gets
 * private, no-index headers.
 */
export async function loadEntry(astro: AstroGlobal, collection?: string) {
  const slug = astro.params.slug;
  if (!collection || !slug) return undefined;
  const { post, isPreview } = await getEntry(
    collection,
    slug,
    getLangFromUrl(astro.url),
  );
  if (isPreview) {
    astro.response.headers.set("Cache-Control", "private, no-store");
    astro.response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return post;
}

/** The URL path of the original file of a media value. */
export function mediaUrl(image: MediaValue) {
  if (image.src) return image.src;
  const storageKey = image.meta?.storageKey;
  const key = typeof storageKey === "string" ? storageKey : image.id;
  return `/_emdash/api/media/file/${encodeURIComponent(key)}`;
}

/** The paths of all published entries in all locales. */
export async function getEntryPaths() {
  const collections = [...NEWS_COLLECTIONS, "pages"];
  const results = await publishedOnly(() =>
    Promise.all(
      collections.flatMap((collection) =>
        languages.map(async (lang) => ({
          collection,
          lang,
          result: await getEmDashCollection(collection, {
            status: "published",
            locale: lang,
          }),
        })),
      ),
    ),
  );
  return results.flatMap(({ collection, lang, result }) => {
    if (result.error) throw result.error;
    return result.entries.map((entry) =>
      entryPath(lang, collection, entrySlug(entry.id, lang)),
    );
  });
}
