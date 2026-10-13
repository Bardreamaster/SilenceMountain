// Makes the detailed country map shown when the life-page globe is zoomed in:
// world-atlas 50m, simplified and quantized to roughly a third of its size.
// Run once with `node scripts/geo.mjs` when world-atlas is updated; the output is committed.
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { presimplify, quantile, simplify } from 'topojson-simplify';
import { quantize } from 'topojson-client';

const require = createRequire(import.meta.url);
const world = JSON.parse(await readFile(require.resolve('world-atlas/countries-50m.json'), 'utf8'));
const pre = presimplify(world);
const out = simplify(pre, quantile(pre, 0.35));
// Drop the per-point weights presimplify added, and properties the globe doesn't use
for (const arc of out.arcs) for (const p of arc) p.length = 2;
for (const g of out.objects.countries.geometries) delete g.properties;
delete out.objects.land;
delete out.transform;
await writeFile(new URL('../src/data/countries-detail.json', import.meta.url), JSON.stringify(quantize(out, 1e4)));
