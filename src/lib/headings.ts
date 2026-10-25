import GithubSlugger from "github-slugger";
import type { PortableTextBlock } from "emdash";

export interface Heading {
  slug: string;
  text: string;
}

/**
 * Adds an anchor id to each heading block, with the slugs that Astro gave the
 * former Markdown headings. Returns the blocks and the headings in order.
 */
export function withHeadingIds(content: PortableTextBlock[]) {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const value = content.map((node) => {
    if (node._type !== "block" || !/^h[1-6]$/.test(String(node.style))) {
      return node;
    }
    const children = node.children as { text?: string }[];
    const text = children.map((child) => child.text ?? "").join("");
    const slug = slugger.slug(text);
    headings.push({ slug, text });
    return { ...node, headingId: slug };
  });
  return { value, headings };
}
