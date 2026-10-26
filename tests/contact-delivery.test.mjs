import test from 'node:test';
import assert from 'node:assert/strict';
import { deliverContact } from '../src/contactDelivery.ts';

const endpoint = 'https://formspree.io/f/example';
const data = new FormData();
data.set('email', 'visitor@example.test');

test('accepted contact requests send once with JSON response preference', async () => {
  let count = 0;
  await deliverContact(endpoint, data, {
    signal: new AbortController().signal,
    fetcher: async (url, options) => {
      count++;
      assert.equal(url, endpoint);
      assert.equal(options.method, 'POST');
      assert.equal(options.headers.Accept, 'application/json');
      assert.equal(options.body, data);
      return new Response(null, { status: 204 });
    },
  });
  assert.equal(count, 1);
});
test('provider rejection and network errors are not reported as success', async () => {
  for (const status of [400, 429, 500])
    await assert.rejects(
      deliverContact(endpoint, data, {
        signal: new AbortController().signal,
        fetcher: async () => new Response(null, { status }),
      }),
    );
  await assert.rejects(
    deliverContact(endpoint, data, {
      signal: new AbortController().signal,
      fetcher: async () => {
        throw new Error('offline');
      },
    }),
  );
});
const abortable = async (_url, options) =>
  new Promise((_resolve, reject) => {
    const abort = () => reject(new DOMException('Aborted', 'AbortError'));
    if (options.signal.aborted) abort();
    else options.signal.addEventListener('abort', abort, { once: true });
  });
test('stalled delivery times out instead of keeping the form locked', async () => {
  await assert.rejects(
    deliverContact(endpoint, data, {
      signal: new AbortController().signal,
      fetcher: abortable,
      timeoutMs: 5,
    }),
    { name: 'AbortError' },
  );
});
test('unmount cancellation is forwarded to the pending request', async () => {
  const controller = new AbortController();
  const result = deliverContact(endpoint, data, { signal: controller.signal, fetcher: abortable });
  controller.abort();
  await assert.rejects(result, { name: 'AbortError' });
});
