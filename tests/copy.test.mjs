import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('visitor-facing source contains no em dashes or removed figure label', () => {
  for (const file of [
    'src/App.tsx',
    'src/Contact.tsx',
    'src/content.ts',
    'src/RetroRobot.tsx',
    'src/index.css',
    'index.html',
  ]) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.equal(source.includes('\u2014'), false, `${file} contains an em dash`);
    assert.equal(source.includes('FIG. 01'), false, `${file} contains the removed label`);
  }
});
