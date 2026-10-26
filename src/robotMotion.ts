// Each stop has a camera and a dedicated set of assemblies, not a global explosion.
const stops = [
  { x: 512, y: 865, zoom: 1, parts: [] as number[] },
  { x: 565, y: 390, zoom: 2.5, parts: [4, 5, 6] },
  { x: 285, y: 550, zoom: 2.2, parts: [1, 8, 9] },
  { x: 755, y: 565, zoom: 2.2, parts: [2, 10, 11] },
  { x: 545, y: 510, zoom: 2.2, parts: [3, 5, 7, 12] },
  { x: 540, y: 130, zoom: 2.8, parts: [0] },
  { x: 512, y: 865, zoom: 1, parts: [] as number[] },
];
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
export function robotMotion(position: number) {
  const safe = Number.isFinite(position) ? Math.max(0, Math.min(6, position)) : 0;
  const start = Math.min(5, Math.floor(safe));
  // A short readable hold at each chapter, then a continuous camera handoff.
  const mix = smooth(clamp((safe - start - 0.16) / 0.68));
  const a = stops[start],
    b = stops[start + 1];
  const lerp = (x: number, y: number) => x + (y - x) * mix;
  const weight = (chapter: number) =>
    (start === chapter ? 1 - mix : 0) + (start + 1 === chapter ? mix : 0);
  const isolation = 1 - weight(0) - weight(6);
  return {
    x: lerp(a.x, b.x),
    y: lerp(a.y, b.y),
    zoom: lerp(a.zoom, b.zoom),
    isolation,
    core: weight(1),
    optics: weight(5),
    pieces: Array.from({ length: 19 }, (_, i) => {
      const selected = lerp(a.parts.includes(i) ? 1 : 0, b.parts.includes(i) ? 1 : 0);
      return { selected, opacity: 1 - isolation * 0.97 + selected * 0.97, open: selected * 0.65 };
    }),
  };
}
