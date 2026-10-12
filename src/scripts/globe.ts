// Interactive globe for the life timeline.
// - Scrolling the list turns the globe to the entry in view.
// - Clicking a marker or a country jumps to the matching entries (within the current filter).
// - Dragging turns the globe by hand.
import { geoContains, geoDistance, geoGraticule10, geoOrthographic, geoPath, type GeoPermissibleObjects } from 'd3-geo';
import { feature } from 'topojson-client';

type Item = { el: HTMLElement; lat: number; lng: number; country?: GeoPermissibleObjects };

export async function initGlobe(canvas: HTMLCanvasElement, list: HTMLElement) {
  const world = (await import('world-atlas/countries-110m.json')).default as any;
  const countries = (feature(world, world.objects.countries) as any).features as GeoPermissibleObjects[];

  const items: Item[] = [...list.querySelectorAll<HTMLElement>('[data-lat]')].map((el) => {
    const lat = Number(el.dataset.lat);
    const lng = Number(el.dataset.lng);
    return { el, lat, lng, country: countries.find((c) => geoContains(c, [lng, lat])) };
  });

  const ctx = canvas.getContext('2d')!;
  const projection = geoOrthographic().clipAngle(90);
  const path = geoPath(projection, ctx);
  const graticule = geoGraticule10();

  let rotation: [number, number] = items.length ? [-items[0].lng, -items[0].lat] : [-10, -30];
  let target = rotation;
  let active: Item | undefined = items[0];
  let hoverCountry: GeoPermissibleObjects | undefined;
  let size = 0;

  // Resolve theme tokens to concrete colours the canvas understands
  const probe = document.createElement('span');
  probe.hidden = true;
  canvas.after(probe);
  const css = (name: string) => {
    probe.style.color = `var(${name})`;
    return getComputedStyle(probe).color;
  };
  const visible = (it: Item) => it.el.offsetParent !== null; // hidden by the type filter

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    size = canvas.clientWidth;
    canvas.width = canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
    draw();
  }

  function draw() {
    projection.rotate(rotation);
    ctx.clearRect(0, 0, size, size);
    const accent = css('--accent');
    const activeCountry = active?.country;

    ctx.beginPath(); path({ type: 'Sphere' }); ctx.fillStyle = css('--code-bg'); ctx.fill();
    ctx.beginPath(); path(graticule); ctx.strokeStyle = css('--border'); ctx.lineWidth = 0.5; ctx.stroke();

    for (const c of countries) {
      ctx.beginPath(); path(c);
      ctx.fillStyle = c === activeCountry || c === hoverCountry ? css('--accent-soft') : css('--land');
      ctx.fill();
      ctx.strokeStyle = css('--bg'); ctx.lineWidth = 0.5; ctx.stroke();
    }

    ctx.beginPath(); path({ type: 'Sphere' }); ctx.strokeStyle = css('--border'); ctx.lineWidth = 1; ctx.stroke();

    const centre: [number, number] = [-rotation[0], -rotation[1]];
    for (const it of items) {
      if (!visible(it) || geoDistance([it.lng, it.lat], centre) > Math.PI / 2) continue;
      const [x, y] = projection([it.lng, it.lat])!;
      const on = it === active;
      ctx.beginPath(); ctx.arc(x, y, on ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = accent; ctx.fill();
      ctx.strokeStyle = css('--bg'); ctx.lineWidth = 2; ctx.stroke();
      if (on) { ctx.beginPath(); ctx.arc(x, y, 11, 0, 2 * Math.PI); ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke(); }
    }
  }

  // Smoothly turn towards `target`
  let frame = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate() {
    cancelAnimationFrame(frame);
    const step = () => {
      const d0 = ((target[0] - rotation[0] + 540) % 360) - 180;
      const d1 = target[1] - rotation[1];
      if (reduced || (Math.abs(d0) < 0.1 && Math.abs(d1) < 0.1)) { rotation = target; draw(); return; }
      rotation = [rotation[0] + d0 * 0.12, rotation[1] + d1 * 0.12];
      draw();
      frame = requestAnimationFrame(step);
    };
    step();
  }

  function focus(it: Item) {
    active = it;
    target = [-it.lng, -Math.max(-60, Math.min(60, it.lat))];
    items.forEach((x) => x.el.classList.toggle('on-globe', x === it));
    animate();
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
  function pointer(ev: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    return [ev.clientX - r.left, ev.clientY - r.top] as [number, number];
  }
  function hit(p: [number, number]) {
    const centre: [number, number] = [-rotation[0], -rotation[1]];
    const marker = items.find((it) => {
      if (!visible(it) || geoDistance([it.lng, it.lat], centre) > Math.PI / 2) return false;
      const [x, y] = projection([it.lng, it.lat])!;
      return Math.hypot(x - p[0], y - p[1]) < 12;
    });
    if (marker) return [marker];
    const ll = projection.invert!(p);
    if (!ll || geoDistance(ll, centre) > Math.PI / 2) return [];
    const country = countries.find((c) => geoContains(c, ll));
    return country ? items.filter((it) => it.country === country && visible(it)) : [];
  }

  let drag: { x: number; y: number; r: [number, number]; moved: boolean } | undefined;
  canvas.addEventListener('pointerdown', (ev) => {
    drag = { x: ev.clientX, y: ev.clientY, r: rotation, moved: false };
    canvas.setPointerCapture(ev.pointerId);
  });
  canvas.addEventListener('pointermove', (ev) => {
    if (drag) {
      const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      if (drag.moved) {
        const k = 180 / size;
        rotation = target = [drag.r[0] + dx * k, Math.max(-80, Math.min(80, drag.r[1] - dy * k))];
        cancelAnimationFrame(frame); draw();
      }
      return;
    }
    const found = hit(pointer(ev));
    const c = found[0]?.country;
    canvas.style.cursor = found.length ? 'pointer' : 'grab';
    if (c !== hoverCountry) { hoverCountry = c; draw(); }
  });
  canvas.addEventListener('pointerup', (ev) => {
    const wasDrag = drag?.moved;
    drag = undefined;
    if (wasDrag) return;
    const found = hit(pointer(ev));
    if (!found.length) return;
    items.forEach((it) => it.el.classList.toggle('picked', found.includes(it)));
    focus(found[0]);
    found[0].el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => items.forEach((it) => it.el.classList.remove('picked')), 2400);
  });
  canvas.addEventListener('pointerleave', () => { if (hoverCountry) { hoverCountry = undefined; draw(); } });

  // Redraw on resize, theme change and filter change
  new ResizeObserver(resize).observe(canvas);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
  document.querySelectorAll('.life-filter input').forEach((i) => i.addEventListener('change', () => requestAnimationFrame(draw)));
  resize();
}
