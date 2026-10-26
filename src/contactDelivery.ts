type DeliveryOptions = {
  signal: AbortSignal;
  fetcher?: typeof fetch;
  timeoutMs?: number;
};

/** No retries: resubmitting automatically can duplicate a visitor's email. */
export async function deliverContact(
  endpoint: string,
  data: FormData,
  { signal, fetcher = fetch, timeoutMs = 15000 }: DeliveryOptions,
) {
  const controller = new AbortController();
  const cancel = () => controller.abort();
  if (signal.aborted) controller.abort();
  signal.addEventListener('abort', cancel, { once: true });
  const timeout = setTimeout(cancel, timeoutMs);
  try {
    const response = await fetcher(endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('The form provider did not accept the message.');
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', cancel);
  }
}
