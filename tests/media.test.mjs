import test from 'node:test';
import assert from 'node:assert/strict';
import { filmTime } from '../src/mediaUtils.ts';
import { robotMotion } from '../src/robotMotion.ts';

test('film seeks stay within the decoded media duration', () => {
  assert.equal(filmTime(-1, 4), 0);
  assert.equal(filmTime(2, 4), 3.96);
  assert.equal(filmTime(0.5, 4), 2);
  assert.equal(filmTime(1, 0.01), 0);
  for (const value of [NaN, Infinity, -Infinity]) {
    assert.equal(filmTime(value, 4), 0);
    assert.equal(filmTime(0.5, value), 0);
    assert.deepEqual(robotMotion(value), robotMotion(0));
  }
});
