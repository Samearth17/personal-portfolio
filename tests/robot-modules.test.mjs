import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const robot = readFileSync(new URL('../src/RetroRobot.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const content = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');

test('introduction is the first portfolio module and robot hotspot', () => {
  assert.match(app, /const modules:[\s\S]*?\{\s*id: 'mind'/);
  assert.match(
    robot,
    /const hotspots:[\s\S]*?\{ id: 'mind', label: 'Explore introduction', number: '01' \}/,
  );
});

test('each portfolio module opens only its own local robot mechanism', () => {
  for (const id of ['mind', 'experience', 'build', 'source', 'core', 'foundation']) {
    assert.ok(robot.includes(`active === '${id}'`), `${id} has a distinct internal component`);
    assert.ok(css.includes(`.robot-machine[data-active='${id}'] .robot-mechanism`));
  }
  assert.ok(robot.includes('className="robot-module-hatch"'));
  assert.ok(robot.includes('className="robot-module-hinge hinge-a"'));
  assert.equal(robot.includes('robot-90s-cinematic-open-v2.png'), false);
});

test('the first interaction is explicit and the head cue is finite', () => {
  assert.match(app, /OPEN 01 \/ MEET ME/);
  assert.match(app, /onClick=\{beginIntroduction\}/);
  assert.match(app, /querySelector<HTMLButtonElement>\('\.hotspot-mind'\)/);
  assert.match(css, /\.robot-machine\[data-active='none'\] \.hotspot-mind::after/);
  assert.match(css, /animation: invite-head [^;]* 2;/);
});

test('selected projects lead with the sourced final-year Track A work', () => {
  assert.match(content, /title: 'Hidden Economic Connections'/);
  assert.match(content, /featured: true/);
  assert.match(content, /feat\/complete-track-a/);
  assert.match(content, /ten held-out synthetic seeds/);
  assert.match(content, /not proof of causality/);
  assert.match(app, /className="project-proof"/);
  assert.match(app, /THE PROBLEM[\s\S]*MY CONTRIBUTION[\s\S]*THE OUTCOME/);
});
