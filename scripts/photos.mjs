// Prepare photos before committing them:
//   npm run photos -- <input folder or files...> [--out src/content/life/img] [--size 2400]
// Resizes so the long edge is at most --size px, applies the camera rotation,
// re-encodes as JPEG (quality 85) and drops all metadata, including GPS location.
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const [, value] = args.splice(i, 2);
  return value;
};
const out = opt('out', 'src/content/life/img');
const size = Number(opt('size', 2400));
const exts = /\.(jpe?g|png|webp|heic|heif|tiff?)$/i;

const inputs = [];
for (const arg of args) {
  if ((await stat(arg)).isDirectory()) {
    for (const f of await readdir(arg)) if (exts.test(f)) inputs.push(path.join(arg, f));
  } else inputs.push(arg);
}
if (!inputs.length) {
  console.log('Usage: npm run photos -- <folder or files...> [--out dir] [--size 2400]');
  process.exit(1);
}

await mkdir(out, { recursive: true });
for (const file of inputs) {
  const name = path.basename(file).replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9一-鿿-]+/g, '-');
  const dest = path.join(out, `${name}.jpg`);
  const before = (await stat(file)).size;
  await sharp(file)
    .rotate()
    .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(dest);
  const after = (await stat(dest)).size;
  console.log(`${file} -> ${dest}  ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(2)} MB`);
}
