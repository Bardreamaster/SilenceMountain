// Share-card images (og:image), rendered once at build time.
//   /og/site/<locale>.png          default card for a language
//   /og/posts/<locale>/<slug>.png  one card per post
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import site, { type Locale } from '../../site.config';
import { locales, splitId, t } from '../../lib/i18n';

const require = createRequire(import.meta.url);
const fontDir = path.dirname(require.resolve('@fontsource/noto-sans-sc/files/noto-sans-sc-latin-700-normal.woff'));

let assets: Promise<{ fonts: { name: string; data: Buffer; weight: 700 }[]; avatar?: string }> | undefined;
function loadAssets() {
  assets ??= (async () => {
    // The CJK subset must come first: satori stops at the first font, and the latin subsets
    // would otherwise claim CJK characters as missing glyphs
    const files = ['chinese-simplified', 'latin', 'latin-ext'].map((n) => `noto-sans-sc-${n}-700-normal.woff`);
    const fonts = await Promise.all(
      files.map(async (f) => ({ name: 'Noto Sans SC', data: await readFile(path.join(fontDir, f)), weight: 700 as const })),
    );
    let avatar: string | undefined;
    if (site.avatar) {
      const png = await sharp(path.join(process.cwd(), 'src/assets', site.avatar)).resize(240, 240).png().toBuffer();
      avatar = `data:image/png;base64,${png.toString('base64')}`;
    }
    return { fonts, avatar };
  })();
  return assets;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

async function render(title: string, locale: Locale) {
  const { fonts, avatar } = await loadAssets();
  const c = site.ogColors;
  const L = t(locale);
  const card = h(
    'div',
    {
      width: 1200, height: 630, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '64px 80px', background: c.background, color: c.foreground, fontFamily: 'Noto Sans SC',
    },
    [
      h('div', { position: 'absolute', left: 0, top: 0, width: 16, height: 630, background: c.accent }),
      h('div', { fontSize: title.length > 30 ? 56 : 68, lineHeight: 1.3, display: 'flex', width: '100%', wordBreak: 'break-word', maxHeight: 300, overflow: 'hidden' }, title),
      h('div', { display: 'flex', alignItems: 'center', gap: 28 }, [
        avatar ? h('img', { width: 112, height: 112, borderRadius: 56 }, undefined, { src: avatar }) : null,
        h('div', { display: 'flex', flexDirection: 'column' }, [
          h('div', { fontSize: 36 }, L.title),
          h('div', { fontSize: 28, color: c.muted }, `${L.author} · ${new URL(site.url).host}`),
        ]),
      ].filter(Boolean)),
    ],
  );
  const svg = await satori(card as never, { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}

export async function getStaticPaths() {
  const posts = await getCollection('posts', (p) => !(import.meta.env.PROD && p.data.draft));
  return [
    ...locales.map((l) => ({ params: { route: `site/${l}` }, props: { title: t(l).description, locale: l } })),
    ...posts.map((p) => {
      const { locale, slug } = splitId(p.id);
      return { params: { route: `posts/${locale}/${slug}` }, props: { title: p.data.title, locale } };
    }),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await render(props.title as string, props.locale as Locale);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
