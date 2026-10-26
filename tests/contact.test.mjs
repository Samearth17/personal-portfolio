import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, formEndpoint, emailDraft } from '../src/contactUtils.ts';

const valid = {
  name: 'Test Visitor',
  email: 'visitor@example.test',
  topic: 'A project or collaboration',
  company: '',
  message: 'I would like to discuss a software project.',
};
test('contact accepts complete input and rejects invalid fields', () => {
  assert.deepEqual(validateContact(valid), {});
  assert.deepEqual(
    Object.keys(validateContact({ ...valid, name: '', email: 'bad', message: 'short' })),
    ['name', 'email', 'message'],
  );
  assert.ok(validateContact({ ...valid, message: 'a'.repeat(3001) }).message);
});
test('only explicit Formspree endpoints enable delivery', () => {
  assert.equal(formEndpoint(undefined), null);
  assert.equal(formEndpoint('https://example.com/f/test'), null);
  assert.equal(formEndpoint('https://formspree.io/f/test?redirect=bad'), null);
  assert.equal(
    formEndpoint(' https://formspree.io/f/abcd1234 '),
    'https://formspree.io/f/abcd1234',
  );
});
test('fallback draft encodes visitor data without sending it', () => {
  const draft = emailDraft(valid, 'owner@example.test');
  assert.ok(draft.startsWith('mailto:owner@example.test?subject='));
  assert.ok(decodeURIComponent(draft).includes('Reply email: visitor@example.test'));
});
test('contact rejects out-of-range fields and unsupported topics', () => {
  const errors = validateContact({
    ...valid,
    name: 'x'.repeat(101),
    company: 'x'.repeat(151),
    topic: 'Unknown',
    email: 'a'.repeat(255) + '@example.test',
  });
  assert.deepEqual(Object.keys(errors), ['name', 'email', 'company', 'topic']);
});
