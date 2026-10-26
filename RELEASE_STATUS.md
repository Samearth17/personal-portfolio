# Release status

Updated 26 October 2026.

## Completed

- Replaced the long scroll choreography with a single six-part robot explorer. The checklist and numbered robot hotspots open the same sections and can close them again.
- Introduction now leads the checklist and opens the head hatch to reveal a mechanical brain. Experience opens the core, Projects and Open source open opposite arm covers, Toolkit reveals circuitry, and Education & achievements opens the foundation. Only the selected component opens while the character stays assembled and recognisable.
- Replaced the technical robot with original 90s toy-animation-inspired artwork and matched assembled/open art without borrowing character artwork. The current design adds restrained toy-catalog color bands, tactile labels, and warmer console details.
- Added a slow character float, synchronized shadow, pointer-responsive pose, and a replayable reveal on assembly changes. Reduced-motion settings suppress the decorative loops and pointer movement.
- Replaced the previous whole-body burst with six local mechanical reveals. Each has a recessed interior, moving illustrated shell, and hinge/screw details; the head has a visibly rising brain. The all-at-once exploded image remains in `public/media/` for provenance but is not loaded by the active page.
- Removed the figure label above the robot and added a test guarding visitor-facing copy against em dashes.
- The open-source view links to selected merged pull requests from [Samearth17](https://github.com/Samearth17), with a GitHub profile link.
- The contact form sends directly to the owner-provided Formspree endpoint `https://formspree.io/f/mwlvdvwy`. A mail draft is only an error-recovery option.
- Checklist buttons expose expanded state, robot hotspots expose pressed state, module URLs are deep-linkable, and reduced-motion users get immediate state changes.
- Escape closes an active module when focus is in the explorer and returns focus to its checklist button.
- A one-time head cue and a keyboard-operable stage action now explain the first interaction. Its action moves focus to the opened head hotspot, and the introductory section takes less space above the robot on laptop-sized screens.
- Selected projects now start with the collaborative final-year Hidden Economic Connections research prototype. Its Track A contribution, held-out synthetic result, and real-data limitation are explicitly distinguished. All three projects present problem, personal contribution, outcome, and inspectable source links.

## Verification

The iCloud-backed `node_modules` in the original folder still contains offloaded placeholders. To avoid changing or deleting those files, the source and media were copied to a fully local temporary build directory. From that copy, strict TypeScript checks, all 18 automated tests, Prettier format checks, the production build, and the production asset check passed.

The revised scene was checked in the browser. Introduction is first on a fresh visit. The guided start opens its head and preserves keyboard focus; Escape returns to the Introduction selector. The final-year case study, all three evidence blocks, and source links were inspected at desktop and phone widths. Each of the six checklist items opened a distinct local robot mechanism and its matching detail panel; the head brain and core interior were visually inspected. Switching among all six modules selected the corresponding mechanism with no browser errors. The 390-pixel mobile layout showed the full character and readable project evidence. Checks at 360, 390, 768, 1280, and 1440 pixels found no horizontal overflow or clipped robot hotspots. A prior owner-provided test contact submission was accepted by Formspree, but inbox delivery still needs owner confirmation. Browser screenshots do not prove physical-device behavior or an actual reduced-motion browser setting.

## Before broad public sharing

- Confirm the Formspree test message arrived in the desired inbox, and complete any pending destination verification in Formspree.
- Review résumé facts, external project links, and media/font usage rights.
- Test the final origin on physical iOS/Safari and Android, including reduced-motion and touch interaction.
- Add a canonical URL and sitemap once the production domain is chosen.
