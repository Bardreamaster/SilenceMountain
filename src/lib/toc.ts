import type { MarkdownHeading } from 'astro';
import site from '../site.config';

/**
 * Headings an entry's table of contents lists: the two highest levels it uses, or nothing
 * when there are fewer than site.toc.minHeadings of them. `sub` marks the lower level.
 */
export function tocItems(headings: MarkdownHeading[]) {
  const top = Math.min(...headings.map((h) => h.depth));
  const items = headings.filter((h) => h.depth <= top + 1).map((h) => ({ ...h, sub: h.depth > top }));
  return items.length >= site.toc.minHeadings ? items : [];
}
