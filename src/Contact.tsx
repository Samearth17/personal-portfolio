import { useEffect, useRef, useState, type FormEvent } from 'react';
import { email, github, linkedin } from './content';
import { emailDraft, formEndpoint, validateContact, type ContactFields } from './contactUtils';
import { deliverContact } from './contactDelivery';

// The public Formspree form ID is safe to ship in a client-side portfolio.
// Deployments can still override it with VITE_CONTACT_ENDPOINT.
const endpoint = formEndpoint(
  import.meta.env.VITE_CONTACT_ENDPOINT || 'https://formspree.io/f/mwlvdvwy',
);
const empty: ContactFields = {
  name: '',
  email: '',
  company: '',
  topic: 'A role or opportunity',
  message: '',
};
export function Contact() {
  const [fields, setFields] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFields, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const summary = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const pending = useRef(false);
  useEffect(() => () => request.current?.abort(), []);
  const change = (key: keyof ContactFields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    if (state !== 'sending') setState('idle');
  };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending.current) return;
    const issues = validateContact(fields);
    setErrors(issues);
    if (Object.keys(issues).length) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    if (!endpoint) {
      setState('error');
      return;
    }
    const data = new FormData(e.currentTarget);
    if (data.get('_gotcha')) return;
    pending.current = true;
    setState('sending');
    request.current = new AbortController();
    const controller = request.current;
    for (const [key, value] of Object.entries(fields)) data.set(key, value.trim());
    try {
      await deliverContact(endpoint, data, { signal: controller.signal });
      if (!controller.signal.aborted) {
        setState('sent');
        setFields(empty);
      }
    } catch {
      if (!controller.signal.aborted) setState('error');
    } finally {
      pending.current = false;
    }
  };
  const errorEntries = Object.entries(errors).filter(([, value]) => value);
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro">
        <p className="eyebrow">LET’S CONNECT</p>
        <h2 id="contact-title">
          Good work starts
          <br />
          with a conversation.
        </h2>
        <p>
          A thoughtful product, a difficult engineering problem, or a team worth joining. Tell me
          what you have in mind.
        </p>
        <a className="contact-email" href={`mailto:${email}`}>
          {email}
        </a>
        <div className="contact-availability">
          <span className="status-dot" />
          Pune, India · Open to opportunities
        </div>
        <nav aria-label="Professional profiles">
          <a href={github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="/samarth-mukhija-resume.pdf" target="_blank" rel="noreferrer">
            Download résumé
          </a>
        </nav>
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        noValidate
        aria-label="Contact Samarth"
        aria-busy={state === 'sending'}
      >
        <div className="form-intro">
          <h3>Leave a note</h3>
          <p>All fields are required unless marked optional.</p>
        </div>
        {errorEntries.length > 0 && (
          <div className="form-errors" role="alert" tabIndex={-1} ref={summary}>
            <p>Please check the following:</p>
            {errorEntries.map(([key, value]) => (
              <a key={key} href={`#contact-${key}`}>
                {value}
              </a>
            ))}
          </div>
        )}
        <fieldset disabled={state === 'sending'}>
          <div className="form-pair">
            <label htmlFor="contact-name">
              Your name
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                maxLength={100}
                required
                value={fields.name}
                onChange={(e) => change('name', e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className="field-error">
                  {errors.name}
                </span>
              )}
            </label>
            <label htmlFor="contact-email">
              Email address
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                value={fields.email}
                onChange={(e) => change('email', e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className="field-error">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <div className="form-pair">
            <label htmlFor="contact-topic">
              What’s on your mind?
              <select
                id="contact-topic"
                name="topic"
                value={fields.topic}
                onChange={(e) => change('topic', e.target.value)}
              >
                <option>A role or opportunity</option>
                <option>A project or collaboration</option>
                <option>Open-source work</option>
                <option>Just saying hello</option>
              </select>
            </label>
            <label htmlFor="contact-company">
              Company <span className="optional">(optional)</span>
              <input
                id="contact-company"
                name="company"
                autoComplete="organization"
                maxLength={150}
                value={fields.company}
                onChange={(e) => change('company', e.target.value)}
              />
            </label>
          </div>
          <label htmlFor="contact-message">
            Your message
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              maxLength={3000}
              required
              value={fields.message}
              onChange={(e) => change('message', e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : 'message-hint'}
            />
            <span className="message-hint" id="message-hint">
              A little context goes a long way. {fields.message.length}/3000
            </span>
            {errors.message && (
              <span id="message-error" className="field-error">
                {errors.message}
              </span>
            )}
          </label>
          <div className="form-honeypot" aria-hidden="true">
            <label>
              Leave this field blank
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <input type="hidden" name="_subject" value="New connection from your portfolio" />
          <div className="form-submit">
            <button type="submit" disabled={state === 'sending' || state === 'sent'}>
              {state === 'sending'
                ? 'Sending…'
                : state === 'sent'
                  ? 'Message received'
                  : 'Send message'}
            </button>
            <p>
              Your details are sent through Formspree to contact Samarth. They are not stored in
              this browser.
            </p>
          </div>
        </fieldset>
        <div className="form-status" role="status">
          {state === 'sent' && (
            <p>
              Thank you. Your message was accepted. Samarth can reply to the email you provided.
            </p>
          )}
          {state === 'error' && (
            <p>
              We couldn’t confirm delivery. Your message is still here. Please retry or{' '}
              <a href={emailDraft(fields, email)}>send it with your email app</a>.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
