import { useEffect, useRef, useState } from 'react';
import { Contact } from './Contact';
import { RetroRobot } from './RetroRobot';
import { github, linkedin, systems, type SystemId } from './content';

const modules: { id: SystemId; label: string; part: string; short: string; color: string }[] = [
  {
    id: 'mind',
    label: 'Introduction',
    part: 'The head',
    short: 'The person behind the work.',
    color: 'blue',
  },
  {
    id: 'experience',
    label: 'Experience',
    part: 'The core',
    short: 'Where the work gets real.',
    color: 'orange',
  },
  {
    id: 'build',
    label: 'Selected projects',
    part: 'The build arm',
    short: 'Ideas put into motion.',
    color: 'yellow',
  },
  {
    id: 'source',
    label: 'Open source',
    part: 'The signal arm',
    short: 'Work that moves outward.',
    color: 'green',
  },
  {
    id: 'core',
    label: 'Technical toolkit',
    part: 'The circuitry',
    short: 'What runs underneath.',
    color: 'purple',
  },
  {
    id: 'foundation',
    label: 'Education & achievements',
    part: 'The foundation',
    short: 'What keeps me moving.',
    color: 'red',
  },
];

const robotLines: Record<SystemId, string> = {
  experience: 'REAL TEAMS. REAL CONSTRAINTS. REAL OUTCOMES.',
  mind: 'CURIOSITY IS WHERE EVERY BUILD BEGINS.',
  build: 'GOOD IDEAS SHOULD MAKE IT INTO THE WORLD.',
  source: 'BETTER SYSTEMS ARE BUILT TOGETHER.',
  core: 'THE BEST WORK HOLDS UP UNDER THE HOOD.',
  foundation: 'ALWAYS LEARNING. ALWAYS BUILDING.',
};

function readInitialModule(): SystemId | null {
  const id = window.location.hash.replace('#module-', '') as SystemId;
  return window.location.hash.startsWith('#module-') && modules.some((module) => module.id === id)
    ? id
    : null;
}

export default function App() {
  const [active, setActive] = useState<SystemId | null>(readInitialModule);
  const [motionPaused, setMotionPaused] = useState(false);
  const [stageArrived, setStageArrived] = useState(false);
  const explorerRef = useRef<HTMLElement>(null);
  const selected = systems.find((system) => system.id === active);
  const selectedModule = modules.find((module) => module.id === active);
  const selectedNumber = modules.findIndex((module) => module.id === active) + 1;

  useEffect(() => {
    const syncFromUrl = () => setActive(readInitialModule());
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  useEffect(() => {
    const node = explorerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setStageArrived(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStageArrived(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !explorerRef.current?.contains(document.activeElement)) return;
      const selectedButton = explorerRef.current.querySelector<HTMLButtonElement>(
        '.module-option.is-selected',
      );
      setActive(null);
      history.replaceState(null, '', window.location.pathname + window.location.search);
      selectedButton?.focus();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [active]);

  const choose = (id: SystemId) => {
    const next = active === id ? null : id;
    setActive(next);
    history.replaceState(
      null,
      '',
      next ? `#module-${next}` : window.location.pathname + window.location.search,
    );
  };

  const beginIntroduction = () => {
    choose('mind');
    requestAnimationFrame(() => {
      explorerRef.current
        ?.querySelector<HTMLButtonElement>('.hotspot-mind')
        ?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <a className="skip-link" href="#explorer">
        Skip to portfolio explorer
      </a>
      <div className="site-shell" id="top">
        <header className="site-header">
          <a className="site-wordmark" href="#top" aria-label="Samarth Mukhija, back to top">
            <span className="wordmark-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>
              samarth<span className="wordmark-last">mukhija</span>
            </span>
          </a>
          <span className="header-edition">SOFTWARE ENGINEER / PORTFOLIO 2026</span>
          <nav className="header-links" aria-label="Primary navigation">
            <a href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="/samarth-mukhija-resume.pdf" target="_blank" rel="noreferrer">
              Résumé
            </a>
            <a className="header-contact" href="#contact">
              Let&apos;s connect <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>

        <main>
          <section className="intro" aria-labelledby="page-title">
            <div className="intro-copy">
              <p className="eyebrow">
                <span className="live-dot" /> SAMARTH MUKHIJA / SYSTEMS IN MOTION
              </p>
              <h1 id="page-title">
                An engineer,
                <br />
                <em>piece by piece.</em>
              </h1>
              <p className="intro-description">
                I&apos;m Samarth Mukhija. I build backend, data, and AI systems that make complex
                things useful. Pick a part of the robot to see the work behind it.
              </p>
            </div>
            <div className="intro-aside" aria-hidden="true">
              <span>01 / 06</span>
              <p>Six systems. One engineer.</p>
            </div>
          </section>

          <section
            className="explorer"
            id="explorer"
            ref={explorerRef}
            data-arrived={stageArrived}
            aria-label="Explore Samarth's portfolio by robot module"
          >
            <div className="module-selector">
              <div className="panel-heading">
                <span>01 / EXPLORE THE SYSTEM</span>
                <span className="panel-led" />
              </div>
              <p className="selector-instruction">
                Choose an assembly to see the thinking behind it.
              </p>
              <div className="module-list">
                {modules.map((module, index) => (
                  <button
                    key={module.id}
                    className={`module-option color-${module.color} ${active === module.id ? 'is-selected' : ''}`}
                    onClick={() => choose(module.id)}
                    aria-expanded={active === module.id}
                    aria-controls="module-detail"
                  >
                    <span className="module-checkbox" aria-hidden="true">
                      {active === module.id && (
                        <svg viewBox="0 0 20 20">
                          <path d="m3 10 5 5 9-10" />
                        </svg>
                      )}
                    </span>
                    <span className="module-option-text">
                      <strong>{module.label}</strong>
                      <small>{module.part}</small>
                    </span>
                    <span className="module-number">0{index + 1}</span>
                  </button>
                ))}
              </div>
              <div className="selector-footer">
                <span className="tiny-checker" aria-hidden="true" /> SELECT / INSPECT / RETURN
              </div>
            </div>

            <div className={`robot-stage ${active ? 'has-selection' : ''}`}>
              <div className="stage-topline">
                <span>SUBJECT 01 / HUMAN + MACHINE</span>
                {active && selectedModule ? (
                  <span>{selectedModule.part.toUpperCase()} / OPEN</span>
                ) : (
                  <button
                    className="stage-start"
                    type="button"
                    onClick={beginIntroduction}
                    aria-label="Open the robot's head to meet Samarth"
                  >
                    OPEN 01 / MEET ME <span aria-hidden="true">↗</span>
                  </button>
                )}
              </div>
              <div className="robot-wrap">
                <RetroRobot active={active} onSelect={choose} motionPaused={motionPaused} />
              </div>
              <div className="robot-dialogue" aria-live="polite">
                <span className="dialogue-cursor" aria-hidden="true" />
                <span>{active ? robotLines[active] : 'CHOOSE A MODULE. EXPLORE THE WORK.'}</span>
                <button
                  className="motion-pause"
                  type="button"
                  aria-pressed={motionPaused}
                  onClick={() => setMotionPaused((paused) => !paused)}
                >
                  {motionPaused ? 'PLAY AMBIENCE' : 'PAUSE AMBIENCE'}
                </button>
              </div>
              <div className="stage-corners" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <article
              className={`module-detail ${selectedModule ? `color-${selectedModule.color}` : ''}`}
              id="module-detail"
              aria-live="polite"
            >
              <div className="panel-heading">
                <span>02 / FIELD NOTES</span>
                <span className="panel-led" />
              </div>
              {selected && selectedModule ? (
                <div className="detail-inner" key={selected.id}>
                  <div className="detail-kicker">
                    <span>{selectedModule.part.toUpperCase()}</span>
                    <span>0{selectedNumber} / 06</span>
                  </div>
                  <h2>{selected.title}</h2>
                  <p className="detail-description">{selected.description}</p>
                  <div className="detail-entries">
                    {selected.items.map((item, index) => (
                      <div className="detail-entry" key={item.title}>
                        <span className="entry-index">0{index + 1}</span>
                        <div>
                          {item.featured && (
                            <span className="entry-featured">FINAL-YEAR PROJECT</span>
                          )}
                          <h3>{item.title}</h3>
                          {item.meta && <p className="entry-meta">{item.meta}</p>}
                          <p>{item.text}</p>
                          {item.proof && (
                            <dl className="project-proof">
                              <div>
                                <dt>THE PROBLEM</dt>
                                <dd>{item.proof.problem}</dd>
                              </div>
                              <div>
                                <dt>MY CONTRIBUTION</dt>
                                <dd>{item.proof.contribution}</dd>
                              </div>
                              <div>
                                <dt>THE OUTCOME</dt>
                                <dd>{item.proof.outcome}</dd>
                              </div>
                            </dl>
                          )}
                          {(item.href || item.sourceHref) && (
                            <div className="entry-links">
                              {item.href && (
                                <a href={item.href} target="_blank" rel="noreferrer">
                                  {selected.id === 'source'
                                    ? 'View merged pull request'
                                    : (item.hrefLabel ?? 'Explore project')}{' '}
                                  <span aria-hidden="true">↗</span>
                                </a>
                              )}
                              {item.sourceHref && (
                                <a href={item.sourceHref} target="_blank" rel="noreferrer">
                                  View source <span aria-hidden="true">↗</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selected.id === 'source' && (
                    <a
                      className="detail-profile-link"
                      href={github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      More on GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="detail-empty">
                  <span className="empty-badge">START WITH A PART</span>
                  <h2>
                    There&apos;s more
                    <br />
                    under the surface.
                  </h2>
                  <p>
                    Every component reveals a different side of how I think, build, and work with
                    people. Choose any module to begin.
                  </p>
                  <div className="empty-steps">A closer look at the work behind the system.</div>
                </div>
              )}
            </article>
          </section>

          <div className="section-divider" aria-hidden="true">
            <span>HAVE A GOOD PROBLEM TO SOLVE?</span>
            <span>↙</span>
          </div>
          <Contact />
        </main>
        <footer className="portfolio-footer">
          <span>© {new Date().getFullYear()} Samarth Mukhija</span>
          <span>Built with curiosity in Pune, India.</span>
          <div>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </>
  );
}
