import type { APIRoute } from 'astro';
import site from '../site.config';

// AI crawlers named by their published user agents; search engines are never listed here
const aiBots = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'meta-externalagent'];

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /', ''];
  if (site.aiCrawlers === 'block') lines.push(...aiBots.map((b) => `User-agent: ${b}`), 'Disallow: /', '');
  lines.push(`Sitemap: ${new URL('/sitemap-index.xml', site.url).href}`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
