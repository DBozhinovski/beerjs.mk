import type { APIRoute } from "astro";
import { getEntryPaths } from "../lib/content";

const STATIC_PATHS = ["/", "/blog", "/en", "/en/blog"];

export const GET: APIRoute = async ({ site }) => {
  const paths = [...STATIC_PATHS, ...(await getEntryPaths())];
  const urls = paths.map((path) => {
    const location = new URL(encodeURI(path), site).href;
    return `<url><loc>${location}</loc></url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
