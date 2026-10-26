export type ContactFields = {
  name: string;
  email: string;
  topic: string;
  message: string;
  company: string;
};
export const contactTopics = [
  'A role or opportunity',
  'A project or collaboration',
  'Open-source work',
  'Just saying hello',
] as const;
export function validateContact(values: ContactFields) {
  const errors: Partial<Record<keyof ContactFields, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (values.name.length > 100) errors.name = 'Please keep your name under 100 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (values.email.length > 254) errors.email = 'Please use a shorter email address.';
  if (values.company.length > 150)
    errors.company = 'Please keep your company name under 150 characters.';
  if (!contactTopics.includes(values.topic as (typeof contactTopics)[number]))
    errors.topic = 'Please choose a topic.';
  if (values.message.trim().length < 20)
    errors.message = 'Please add at least 20 characters so I know how to help.';
  if (values.message.length > 3000)
    errors.message = 'Please keep your message under 3,000 characters.';
  return errors;
}
export function formEndpoint(value: unknown) {
  if (typeof value !== 'string') return null;
  // Public form IDs are not secrets. Only send visitor data to the configured provider.
  return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(value.trim()) ? value.trim() : null;
}
export function emailDraft(values: ContactFields, recipient: string) {
  const body = `Name: ${values.name.trim()}\nReply email: ${values.email.trim()}\nCompany: ${values.company.trim() || 'Not provided'}\n\n${values.message.trim()}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(`Portfolio inquiry: ${values.topic}`)}&body=${encodeURIComponent(body)}`;
}
