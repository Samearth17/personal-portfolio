# Samarth Mukhija | An engineer, piece by piece

A React and TypeScript portfolio built around an original modular robot. Six checklist items open dedicated assemblies and reveal introduction, experience, projects, open-source work, technical toolkit, and education and achievements. The 90s-inspired framing is intentionally light: the work stays readable, keyboard accessible, and quick to explore. The first-visit stage cue opens Introduction; the selected-project chapter leads with a sourced final-year research case study and gives each project a problem, contribution, and outcome.

## Run locally

Use Node.js 24 LTS (minimum 22.18) and npm.

```sh
npm ci
npm run check
npm run dev
```

Preview: http://127.0.0.1:5221/. The port is strict: another application will not be silently replaced or moved. Stop your existing portfolio preview before starting a different server on that port.

## Production deployment

```sh
npm ci
npm run check
```

Deploy this repository to Vercel with the Vite preset. Use `npm run build` as the build command and `build` as the output directory. The app expects to be hosted at the domain root, not under a subdirectory. `npm run preview` serves the production bundle locally; it is not a production hosting service.

No server, database, account creation, or paid service is needed for the portfolio itself. Publishing an owner-only Site does not make it publicly accessible; review the audience before sharing a résumé link.

The included `_headers` file applies on hosts that support that convention. On other hosts, configure its security and cache headers in the host dashboard. Hashed files under `/assets/` can be cached immutably; HTML should revalidate. Test on the final HTTPS origin after deployment.

## Contact form

The owner-provided public Formspree endpoint `https://formspree.io/f/mwlvdvwy` is built in, so the form sends directly without a hosting environment variable. `VITE_CONTACT_ENDPOINT` can override it with another public Formspree form URL. A malformed nonempty override stops the build. Never put private API keys in a `VITE_` variable.

Follow [CONTACT_SETUP.md](CONTACT_SETUP.md) to verify the destination inbox. Successful provider acceptance is not proof of inbox delivery; only an owner-confirmed test message verifies the end-to-end path. The mail-app link is an error recovery option, never the normal submit path.

## Maintenance

- `npm run typecheck`: strict TypeScript checks, including unused code.
- `npm test`: motion, media boundaries, form validation, timeout, cancellation, and failure tests.
- `npm run build`: production output.
- `npm run check`: type checks, tests, build, and asset verification.
- `npm run format` / `npm run format:check`: consistent source formatting.

`src/content.ts` contains portfolio facts and project evidence. The final-year entry documents Samarth's Track A work in the [collaborative research repository](https://github.com/ayushmath07/final-year-project/tree/feat/complete-track-a). Its F1 result is from held-out synthetic data only; the real-price rankings are exploratory, not causal claims. `App.tsx` owns checklist selection and deep links, with Introduction first. `RetroRobot.tsx` keeps the original 90s-inspired character assembled and opens only the chosen physical module. The head hatch lifts to reveal a glowing mechanical brain; the core, arms, circuitry, and foundation have their own recessed components and moving shell covers. Small hinges and screws make the relationship between outer shell and inner mechanism legible. The selected hotspot and adjacent field notes identify the matching portfolio chapter. The robot also has a slow idle float, synchronized ground shadow, and pointer-responsive pose. Visitors can pause ambient motion or press Escape to close a module; rapid changes remain responsive and the operating-system reduced-motion preference shows the final open state immediately. The robot art was generated specifically for this portfolio and is not a franchise character. The previous all-at-once exploded image is retained as an unused archive; see [ROBOT_ASSET.md](ROBOT_ASSET.md). Contact validation and delivery remain separate, testable modules. Legacy scroll-story source remains in the repository for reference but is not imported into the production app.

## Before going public

- Verify the supplied Formspree form's destination and submit a test message yourself.
- Review résumé facts, project links, and media/font usage rights. The heading/body font links are retained from the supplied design; no new font license is implied.
- Test the final origin on physical iOS/Safari and Android, including reduced motion and keyboard navigation.
- Add a canonical URL and sitemap once the real production domain is chosen.

See [RELEASE_STATUS.md](RELEASE_STATUS.md) for the current verification status and remaining launch checks. Previous build/bootstrap files and obsolete CSS are preserved locally in ignored `.local-backup/pre-cleanup/`; do not upload that directory.
