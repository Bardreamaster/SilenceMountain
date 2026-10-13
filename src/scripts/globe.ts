// Interactive globe for the life timeline.
// - Scrolling the list turns the globe to the entry in view.
// - Clicking a marker or a country jumps to the matching entries (within the current filter).
// - Dragging turns the globe by hand.
// - Zooming (wheel, pinch, double-click or the +/- buttons) unfolds the globe into a flat map;
//   a more detailed map loads the first time someone zooms in.
import {
  geoContains, geoDistance, geoEquirectangularRaw, geoGraticule10, geoOrthographicRaw, geoPath,
  geoProjectionMutator, type GeoPermissibleObjects, type GeoRawProjection,
} from 'd3-geo';
import { feature } from 'topojson-client';

type Item = { el: HTMLElement; lat: number; lng: number; country?: number };

const MIN_ZOOM = 1;
const MAX_ZOOM = 14;
/** Between these zoom levels the globe unfolds into a flat map */
const UNFOLD_START = 1.8;
const UNFOLD_END = 2.8;
const DEG = 180 / Math.PI;

/** Orthographic (globe) blended with equirectangular (flat map); t = 0 globe, 1 map */
function blend(t: number): GeoRawProjection {
  const raw = ((x: number, y: number) => {
    const [x0, y0] = geoOrthographicRaw(x, y);
    const [x1, y1] = geoEquirectangularRaw(x, y);
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
  }) as GeoRawProjection;
  // Clicks need the inverse; zoom snaps to one end, so only the two pure forms are needed
  if (t <= 0) raw.invert = geoOrthographicRaw.invert;
  else if (t >= 1) raw.invert = geoEquirectangularRaw.invert;
  return raw;
}

const shapesOf = (world: any) => (feature(world, world.objects.countries) as any).features as GeoPermissibleObjects[];

export async function initGlobe(canvas: HTMLCanvasElement, list: HTMLElement, controls?: HTMLElement | null) {
  const coarse = shapesOf((await import('world-atlas/countries-110m.json')).default);
  let countries = coarse;
  let detailLoading = false;

  const items: Item[] = [...list.querySelectorAll<HTMLElement>('[data-lat]')].map((el) => {
    const lat = Number(el.dataset.lat);
    const lng = Number(el.dataset.lng);
    const i = coarse.findIndex((c) => geoContains(c, [lng, lat]));
    return { el, lat, lng, country: i < 0 ? undefined : i };
  });
  // Country ids match between the coarse and detailed maps, so look entries up by id
  const ids = coarse.map((c: any) => c.id);
  const countryOf = (it?: Item) => {
    if (it?.country === undefined) return undefined;
    const id = ids[it.country];
    return countries.find((c: any) => c.id === id);
  };
  const indexOf = (c: GeoPermissibleObjects) => ids.indexOf((c as any).id);

  const ctx = canvas.getContext('2d')!;
  const mutate = geoProjectionMutator(blend);
  let projection = mutate(0);
  const graticule = geoGraticule10();

  // View: centre (as d3 rotation, i.e. [-lng, -lat]) and zoom
  let rotation: [number, number] = items.length ? [-items[0].lng, -items[0].lat] : [-10, -30];
  let target = rotation;
  let zoom = MIN_ZOOM;
  let zoomTarget = zoom;
  let active: Item | undefined = items[0];
  let hoverCountry: GeoPermissibleObjects | undefined;
  let size = 0;

  const unfold = () => Math.max(0, Math.min(1, (zoom - UNFOLD_START) / (UNFOLD_END - UNFOLD_START)));
  const flat = () => unfold() >= 1;

  // Resolve theme tokens to concrete colours the canvas understands
  const probe = document.createElement('span');
  probe.hidden = true;
  canvas.after(probe);
  const css = (name: string) => {
    probe.style.color = `var(${name})`;
    return getComputedStyle(probe).color;
  };
  const visible = (it: Item) => it.el.offsetParent !== null; // hidden by the type filter

  function setup() {
    const t = unfold();
    projection = mutate(t);
    const scale = (size / 2 - 2) * zoom;
    // On the globe the centre latitude is a rotation; on the map it is a vertical shift
    const lat = -rotation[1];
    projection
      .scale(scale)
      .rotate([rotation[0], rotation[1] * (1 - t)])
      .translate([size / 2, size / 2 + (lat / DEG) * scale * t])
      .clipAngle(t >= 1 ? 0 : 90 + t * 89)
      .clipExtent([[0, 0], [size, size]])
      .precision(0.5);
  }

  function onScreen(it: Item) {
    if (!visible(it)) return null;
    const t = unfold();
    if (t < 0.5 && geoDistance([it.lng, it.lat], [-rotation[0], -rotation[1] * (1 - t)]) > Math.PI / 2) return null;
    const p = projection([it.lng, it.lat]);
    if (!p || p[0] < -12 || p[1] < -12 || p[0] > size + 12 || p[1] > size + 12) return null;
    return p;
  }

  function draw() {
    setup();
    const path = geoPath(projection, ctx);
    ctx.clearRect(0, 0, size, size);
    const accent = css('--accent');
    const bg = css('--bg');
    const activeCountry = countryOf(active);

    ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = css('--code-bg'); ctx.fill();
    ctx.beginPath(); path(graticule); ctx.strokeStyle = css('--border'); ctx.lineWidth = 0.5; ctx.stroke();

    const land = css('--land');
    const soft = css('--accent-soft');
    for (const c of countries) {
      ctx.beginPath(); path(c);
      ctx.fillStyle = c === activeCountry || c === hoverCountry ? soft : land;
      ctx.fill();
      ctx.strokeStyle = bg; ctx.lineWidth = 0.5; ctx.stroke();
    }

    ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = css('--border'); ctx.lineWidth = 1; ctx.stroke();

    for (const it of items) {
      const p = onScreen(it);
      if (!p) continue;
      const on = it === active;
      ctx.beginPath(); ctx.arc(p[0], p[1], on ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = accent; ctx.fill();
      ctx.strokeStyle = bg; ctx.lineWidth = 2; ctx.stroke();
      if (on) { ctx.beginPath(); ctx.arc(p[0], p[1], 11, 0, 2 * Math.PI); ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke(); }
    }
    canvas.dataset.view = flat() ? 'map' : 'globe';
  }

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    size = canvas.clientWidth;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  // Smoothly move towards `target` and `zoomTarget`
  let frame = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate() {
    cancelAnimationFrame(frame);
    const step = () => {
      const d0 = ((target[0] - rotation[0] + 540) % 360) - 180;
      const d1 = target[1] - rotation[1];
      const dz = zoomTarget - zoom;
      if (reduced || (Math.abs(d0) < 0.1 && Math.abs(d1) < 0.1 && Math.abs(dz) < 0.005)) {
        rotation = target; zoom = zoomTarget; draw(); return;
      }
      rotation = [rotation[0] + d0 * 0.15, rotation[1] + d1 * 0.15];
      zoom += dz * 0.2;
      draw();
      frame = requestAnimationFrame(step);
    };
    step();
  }

  const clampLat = (r1: number) => Math.max(-80, Math.min(80, r1));

  function focus(it: Item) {
    active = it;
    target = [-it.lng, -clampLat(it.lat)];
    items.forEach((x) => x.el.classList.toggle('on-globe', x === it));
    animate();
  }

  // Zoom, then settle on the globe or the map rather than a half-unfolded shape
  let settle = 0;
  function zoomTo(z: number, now = false) {
    zoomTarget = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z));
    if (zoomTarget > UNFOLD_START && !detailLoading) {
      detailLoading = true;
      import('../data/countries-detail.json').then((m) => { countries = shapesOf(m.default); draw(); });
    }
    if (now) { zoom = zoomTarget; cancelAnimationFrame(frame); draw(); } else animate();
    clearTimeout(settle);
    settle = window.setTimeout(() => {
      if (zoomTarget > UNFOLD_START && zoomTarget < UNFOLD_END) {
        zoomTarget = zoomTarget < (UNFOLD_START + UNFOLD_END) / 2 ? UNFOLD_START : UNFOLD_END;
        animate();
      }
    }, 250);
  }

  // Scroll → globe: the entry nearest the upper middle of the screen wins
  const seen = new Set<Item>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const it = items.find((x) => x.el === e.target)!;
        e.isIntersecting ? seen.add(it) : seen.delete(it);
      }
      const pick = [...seen].filter(visible).sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top)[0];
      if (pick && pick !== active) focus(pick);
    },
    { rootMargin: '-25% 0px -55% 0px' },
  );
  items.forEach((it) => io.observe(it.el));

  // Globe → list: click a marker, or a country with entries
  function pointer(ev: { clientX: number; clientY: number }) {
    const r = canvas.getBoundingClientRect();
    return [ev.clientX - r.left, ev.clientY - r.top] as [number, number];
  }
  function hit(p: [number, number]) {
    const marker = items.find((it) => {
      const q = onScreen(it);
      return q && Math.hypot(q[0] - p[0], q[1] - p[1]) < 12;
    });
    if (marker) return [marker];
    if (!projection.invert || (unfold() > 0 && !flat())) return [];
    const ll = projection.invert(p);
    if (!ll || (!flat() && geoDistance(ll, [-rotation[0], -rotation[1]]) > Math.PI / 2)) return [];
    const c = countries.find((c) => geoContains(c, ll));
    const i = c ? indexOf(c) : -1;
    return i < 0 ? [] : items.filter((it) => it.country === i && visible(it));
  }

  // Drag to turn (globe) or pan (map); two fingers pinch to zoom
  const pointers = new Map<number, [number, number]>();
  let drag: { x: number; y: number; r: [number, number]; moved: boolean } | undefined;
  let pinch: { d: number; z: number } | undefined;
  const spread = () => { const [a, b] = [...pointers.values()]; return Math.hypot(a[0] - b[0], a[1] - b[1]); };

  canvas.addEventListener('pointerdown', (ev) => {
    pointers.set(ev.pointerId, [ev.clientX, ev.clientY]);
    canvas.setPointerCapture(ev.pointerId);
    if (pointers.size === 2) { pinch = { d: spread(), z: zoom }; drag = undefined; return; }
    drag = { x: ev.clientX, y: ev.clientY, r: rotation, moved: false };
  });
  canvas.addEventListener('pointermove', (ev) => {
    if (pointers.has(ev.pointerId)) pointers.set(ev.pointerId, [ev.clientX, ev.clientY]);
    if (pinch && pointers.size === 2) { zoomTo(pinch.z * (spread() / pinch.d), true); return; }
    if (drag) {
      const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      if (drag.moved) {
        // Degrees per pixel: the globe turns, the map slides under the finger
        const t = unfold();
        const scale = (size / 2 - 2) * zoom;
        const k = (1 - t) * (180 / size / zoom) + t * (DEG / scale);
        rotation = target = [drag.r[0] + dx * k, clampLat(drag.r[1] - dy * k)];
        cancelAnimationFrame(frame); draw();
      }
      return;
    }
    const found = hit(pointer(ev));
    const c = countryOf(found[0]);
    canvas.style.cursor = found.length ? 'pointer' : 'grab';
    if (c !== hoverCountry) { hoverCountry = c; draw(); }
  });
  const release = (ev: PointerEvent) => {
    pointers.delete(ev.pointerId);
    if (pinch) { if (pointers.size < 2) pinch = undefined; zoomTo(zoom); drag = undefined; return; }
    const wasDrag = drag?.moved;
    drag = undefined;
    if (wasDrag || ev.type !== 'pointerup') return;
    const found = hit(pointer(ev));
    if (!found.length) return;
    items.forEach((it) => it.el.classList.toggle('picked', found.includes(it)));
    focus(found[0]);
    found[0].el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => items.forEach((it) => it.el.classList.remove('picked')), 2400);
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', () => { if (hoverCountry) { hoverCountry = undefined; draw(); } });
  canvas.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    zoomTo(zoomTarget * Math.exp(-ev.deltaY * 0.0015));
  }, { passive: false });
  canvas.addEventListener('dblclick', (ev) => { ev.preventDefault(); zoomTo(zoomTarget < UNFOLD_END ? UNFOLD_END : zoomTarget * 2); });

  controls?.addEventListener('click', (ev) => {
    const b = (ev.target as HTMLElement).closest<HTMLButtonElement>('button[data-zoom]');
    if (!b) return;
    const z = b.dataset.zoom;
    if (z === 'in') zoomTo(zoomTarget < UNFOLD_START ? UNFOLD_END : zoomTarget * 1.6);
    else if (z === 'out') zoomTo(zoomTarget <= UNFOLD_END ? MIN_ZOOM : zoomTarget / 1.6);
    else zoomTo(MIN_ZOOM);
  });

  // Redraw on resize, theme change and filter change
  new ResizeObserver(resize).observe(canvas);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
  document.querySelectorAll('.filter input').forEach((i) => i.addEventListener('change', () => requestAnimationFrame(draw)));
  resize();
}
