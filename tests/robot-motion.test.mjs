import assert from 'node:assert/strict';
import { test } from 'node:test';
import { robotMotion } from '../src/robotMotion.ts';

test('beginning and ending return to the same complete robot', () => {
  assert.deepEqual(robotMotion(0), robotMotion(6));
  assert.equal(robotMotion(0).zoom, 1);
  assert.ok(robotMotion(0).pieces.every((p) => p.opacity === 1 && p.open === 0));
});
test('chapters isolate only the dedicated assemblies', () => {
  const groups = [[4, 5, 6], [1, 8, 9], [2, 10, 11], [3, 5, 7, 12], [0]];
  groups.forEach((parts, i) => {
    const pose = robotMotion(i + 1);
    assert.deepEqual(
      pose.pieces.flatMap((p, index) => (p.selected === 1 ? [index] : [])),
      parts,
    );
    assert.ok(pose.zoom > 1);
  });
  assert.equal(robotMotion(1).core, 1);
  assert.equal(robotMotion(5).optics, 1);
});
test('all camera samples and opacities stay finite and bounded', () => {
  for (let p = -1; p <= 7; p += 0.007) {
    const pose = robotMotion(p);
    assert.ok([pose.x, pose.y, pose.zoom].every(Number.isFinite));
    assert.ok(pose.zoom >= 1 && pose.zoom <= 2.8);
    pose.pieces.forEach((part) => assert.ok(part.opacity >= 0 && part.opacity <= 1.000001));
  }
});
test('camera is continuous at every chapter boundary and reversible', () => {
  for (let p = 1; p < 6; p++) {
    const before = robotMotion(p - 0.00001),
      after = robotMotion(p + 0.00001);
    for (const k of ['x', 'y', 'zoom']) assert.ok(Math.abs(before[k] - after[k]) < 0.001);
  }
  const samples = Array.from({ length: 61 }, (_, i) => robotMotion(i / 10));
  samples.reverse().forEach((pose, i) => assert.deepEqual(pose, robotMotion((60 - i) / 10)));
});
