import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('build');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
assert.ok(html.includes('Samarth Mukhija'));
assert.ok(!html.includes('/src/main.tsx'), 'Build must reference compiled entry points.');
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  assert.ok((await stat(resolve(root, match[1].slice(1)))).size > 0, `Missing ${match[1]}`);
}
for (const asset of [
  'robot-90s-original.png',
  'robot-90s-cinematic-open-v2.png',
  'robot-overview.png',
  'robot-core-open.png',
  'robot-optics-open.png',
  'aria-motion.mp4',
]) {
  assert.ok((await stat(resolve(root, 'media', asset))).size > 1000, `Missing media ${asset}`);
}
const resume = await readFile(resolve(root, 'samarth-mukhija-resume.pdf'));
assert.equal(resume.subarray(0, 5).toString(), '%PDF-');
for (const name of await readdir(root))
  assert.ok(!name.startsWith('.env'), 'Environment files must not be published.');
console.log(
  'Production HTML, bundles, robot media, résumé, and environment-file exclusion verified.',
);
