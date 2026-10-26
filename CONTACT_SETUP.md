# Activate inbox delivery

The contact form now sends directly to the public Formspree URL you supplied: `https://formspree.io/f/mwlvdvwy`. No account or form was created on your behalf. Provider acceptance and delivery to your inbox still need an owner-confirmed test.

1. Sign in to Formspree and check that form `mwlvdvwy` delivers to `mukhijasamarth3017@gmail.com` (or your chosen inbox).
2. Complete Formspree's destination-email verification and review its spam protection settings.
3. Submit a test message yourself from the deployed site and confirm it arrives in your inbox. Check spam folders and the Formspree dashboard if needed.
4. If you ever replace the form, set `VITE_CONTACT_ENDPOINT` to its public URL before building. Never place private keys in a `VITE_` variable.

The form provides sending, accepted, and error states, retains input after errors, and includes a honeypot and timeout. A mail-app draft is offered only if direct delivery fails.

Browser acceptance is not proof of inbox delivery. Your verified destination and provider configuration must be tested separately.
