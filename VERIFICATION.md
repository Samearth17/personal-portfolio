# Portfolio verification

Verified October 16, 2026.

- TypeScript check and Vite production build passed in `/private/tmp/portfolio-review.TJseSH` using the portfolio source and local media. Some older files and installed dependencies in Documents stalled on read, so the preview uses a clean temporary runtime with equivalent Vite bootstrapping.
- Seven tests passed: contact validation, endpoint allowlist, email-draft encoding, robot endpoint poses, subsystem selection, finite camera values, and reversible camera continuity.
- Browser inspection covered 1280x720, 390x844, 360x740, and 768x1024. Checked desktop, tablet, and phone document widths matched their viewports.
- Checked core detail entry, accordion expansion, Escape return and focus restoration, project chapter navigation, readable robot greeting, opt-in speech state, empty form validation and error-summary focus, and the unsent email-draft fallback.
- No browser console errors were captured during the review. No email was sent.
- Phone chapter targets measure 44 CSS pixels wide. Contact inputs use 16px phone text to avoid focus zoom.

## Remaining external verification

Direct inbox delivery needs the owner's verified Formspree endpoint. Follow `CONTACT_SETUP.md`. The fallback explicitly states that a prepared draft has not been sent. Native speech depends on installed browser/system voices; audible output was not independently evaluated. Physical iOS/Android devices and reduced-motion OS settings were not tested during this pass.

The robot uses authored images and isolated assemblies, not a runtime 3D model. Core and optics have dedicated open-state imagery.
