import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Robot } from './Robot';
import { RobotGuide } from './RobotGuide';
import { github, systems, type SystemId } from './content';

const chapters = [
  {
    label: 'Introduction',
    system: 'mind',
    title: ['Samarth', 'Mukhija.', 'Built to solve.'],
    text: 'I’m Samarth Mukhija. Software engineer, systems thinker, endlessly curious human.',
    note: 'SOFTWARE ENGINEER / BACKEND · DATA · AI',
    word: 'HUMAN',
    progress: 0,
  },
  {
    label: 'The core',
    system: 'core',
    title: ['Good systems', 'start on', 'the inside.'],
    text: 'Backend, data, and applied AI. The toolkit behind the things I build.',
    note: '01 / THE ENGINEERING CORE',
    word: 'LOGIC',
    progress: 0.42,
  },
  {
    label: 'The work',
    system: 'build',
    title: ['Thought', 'into', 'working things.'],
    text: 'The build arm. Where complicated problems become useful products.',
    note: '02 / SELECTED WORK',
    word: 'BUILD',
    progress: 0.65,
  },
  {
    label: 'Experience',
    system: 'experience',
    title: ['Made for', 'the real', 'world.'],
    text: 'Different teams. Real constraints. A growing instinct for what matters.',
    note: '03 / EXPERIENCE IN MOTION',
    word: 'PROOF',
    progress: 0.78,
  },
  {
    label: 'Open source',
    system: 'source',
    title: ['Nothing great', 'is built', 'alone.'],
    text: 'The backbone. Contributing to the systems that other people build upon.',
    note: '04 / A SHARED FOUNDATION',
    word: 'SHARED',
    progress: 0.91,
  },
  {
    label: 'The human',
    system: 'mind',
    title: ['A machine', 'for learning.', 'A human, still.'],
    text: 'Computer science, competition, and curiosity. The parts that keep me moving.',
    note: '05 / BEYOND THE CODE',
    word: 'CURIOUS',
    progress: 1,
  },
  {
    label: 'Together',
    system: 'mind',
    title: ['All these parts.', 'Your next', 'collaborator.'],
    text: 'The best work happens when different ways of thinking come together. Let’s build something.',
    note: '06 / BACK TO THE BIG PICTURE',
    word: 'TOGETHER',
    progress: 0,
  },
] as const;
const clamp = (v: number) => Math.max(0, Math.min(1, v));

function ProjectSignals() {
  return (
    <div className="project-signals">
      <a href="https://ipo-platform-amber.vercel.app/" target="_blank" rel="noreferrer">
        <div className="signal-label mono">01 / IPO INTELLIGENCE </div>
        <svg viewBox="0 0 280 65" aria-label="Illustrative financial signal, not market data">
          <path d="M0 55H280M0 30H280M0 5H280" stroke="currentColor" opacity=".13" />
          <path
            d="M0 53L20 47 35 50 55 32 75 39 100 20 120 31 150 18 175 23 199 9 220 17 245 4 280 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="signal-stats">
          <strong>
            99+ <small>IPOs evaluated</small>
          </strong>
          <span>4 risk profiles</span>
        </div>
        <span className="signal-footnote">Illustrative signal, not market data</span>
      </a>
      <a href="https://multi-agent-data-extractor.onrender.com" target="_blank" rel="noreferrer">
        <div className="signal-label mono">02 / MULTI-AGENT EXTRACTION </div>
        <div className="mini-flow">
          <span>
            PDF
            <br />
            CSV / XLS
          </span>
          <i />
          <strong>
            6<small>AGENTS</small>
          </strong>
          <i />
          <span>
            Queryable
            <br />
            information
          </span>
        </div>
        <p>Classify. Route. Extract. Ask.</p>
      </a>
    </div>
  );
}

export function Journey({
  reduced,
  compact,
  paused,
  onInspect,
  film,
}: {
  reduced: boolean;
  compact: boolean;
  paused: boolean;
  onInspect: (id: SystemId, trigger: HTMLButtonElement) => void;
  film: ReactNode;
}) {
  const stage = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(0);
  const [manualChapter, setManualChapter] = useState(0);
  const [menu, setMenu] = useState(false);
  const [motionOff, setMotionOff] = useState(false);
  const manual = reduced || compact || motionOff;
  const menuToggle = useRef<HTMLButtonElement>(null);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenu(false);
      menuToggle.current?.focus();
    };
    window.addEventListener('keydown', closeMenu);
    return () => window.removeEventListener('keydown', closeMenu);
  }, [menu]);
  useEffect(() => {
    if (manual) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = stage.current;
      if (!el) return;
      setPosition(
        clamp(
          -el.getBoundingClientRect().top /
            Math.max(1, el.offsetHeight - (el.firstElementChild?.clientHeight ?? innerHeight)),
        ) * 6,
      );
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('resize', scroll);
    return () => {
      removeEventListener('scroll', scroll);
      removeEventListener('resize', scroll);
      cancelAnimationFrame(frame);
    };
  }, [manual]);
  const chapter = manual ? manualChapter : Math.min(6, Math.floor(position + 0.5));
  const scene = chapters[chapter];
  const progress = (manual ? manualChapter : position) / 6;
  const go = (index: number) => {
    setMenu(false);
    if (manual) {
      setManualChapter(index);
      stage.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }
    const el = stage.current;
    if (!el) return;
    window.scrollTo({
      top:
        scrollY +
        el.getBoundingClientRect().top +
        ((el.offsetHeight - (el.firstElementChild?.clientHeight ?? innerHeight)) * index) / 6,
      behavior: 'smooth',
    });
  };
  const system = systems.find((s) => s.id === scene.system)!;
  return (
    <section
      className={`robot-journey ${manual ? 'journey-static' : ''} ${compact ? 'journey-compact' : ''}`}
      id="top"
      ref={stage}
      aria-label="An interactive journey through Samarth’s portfolio"
    >
      <div className={`journey-stage chapter-${chapter} ${speaking ? 'robot-speaking' : ''}`}>
        <header className="journey-header">
          <button
            className="personal-wordmark"
            onClick={() => go(0)}
            aria-label="Back to introduction"
          >
            samarth mukhija<span>Software engineer</span>
          </button>
          <span className="header-location">Pune, India</span>
          <nav aria-label="Quick navigation">
            <button onClick={() => go(2)}>Selected work</button>
            <button onClick={() => go(3)}>Experience</button>
            <a href="/samarth-mukhija-resume.pdf" target="_blank" rel="noreferrer">
              Résumé{' '}
            </a>
          </nav>
          <a className="journey-contact" href="#contact">
            Let’s talk{' '}
          </a>
          <button
            className="motion-toggle"
            aria-pressed={manual}
            disabled={reduced || compact}
            onClick={() => {
              setManualChapter(chapter);
              setMotionOff(!motionOff);
              requestAnimationFrame(() => {
                const el = stage.current;
                if (!el) return;
                const travel = motionOff
                  ? el.offsetHeight - (el.firstElementChild?.clientHeight ?? innerHeight)
                  : 0;
                window.scrollTo({
                  top: scrollY + el.getBoundingClientRect().top + (travel * chapter) / 6,
                  behavior: 'instant',
                });
              });
            }}
          >
            Motion {manual ? 'off' : 'on'}
          </button>
          <button
            ref={menuToggle}
            className="journey-menu"
            aria-controls="chapter-menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            Chapters {menu ? 'close' : ''}
          </button>
        </header>
        <nav
          id="chapter-menu"
          className="journey-mobile-menu"
          aria-label="Mobile chapters"
          hidden={!menu}
        >
          {chapters.map((c, i) => (
            <button key={c.label} onClick={() => go(i)}>
              {String(i).padStart(2, '0')} / {c.label}
            </button>
          ))}
        </nav>
        <div className="journey-topline mono">
          <span>ANATOMY OF AN ENGINEER</span>
          <span>
            <i className="status-dot" /> SELECTED WORK & EXPERIENCE
          </span>
        </div>
        <div className="journey-watermark" aria-hidden="true" key={scene.word}>
          {scene.word}
        </div>
        <div className="journey-robot">
          <Robot
            position={manual ? manualChapter : position}
            onInspect={onInspect}
            reduced={manual}
            activeSystem={chapter > 0 && chapter < 6 ? scene.system : undefined}
          />
        </div>
        {chapter > 0 && chapter < 6 && (
          <div className="module-caption">
            <span className="mono">
              0{chapter} / {system.name.toUpperCase()}
            </span>
            <span>
              {chapter === 1 ? 'Core exposed' : chapter === 5 ? 'Optics open' : 'Assembly isolated'}
            </span>
            <i />
          </div>
        )}
        <div className="journey-narrative" key={scene.note}>
          <p className="eyebrow">{scene.note}</p>
          <h1>
            {scene.title.map((line, i) => (
              <span key={line} className={i === 1 ? 'soft-line' : ''}>
                {line}
              </span>
            ))}
          </h1>
          <p className="journey-description">{scene.text}</p>
          {chapter === 0 ? (
            <button className="journey-next" onClick={() => go(1)}>
              Look inside{' '}
            </button>
          ) : chapter === 6 ? (
            <a className="journey-next" href="#contact">
              Start a conversation{' '}
            </a>
          ) : (
            <button
              className="journey-next"
              onClick={(e) => onInspect(scene.system, e.currentTarget)}
            >
              Explore {system.label.toLowerCase()}
            </button>
          )}
          {chapter === 4 && (
            <a className="source-profile-link" href={github} target="_blank" rel="noreferrer">
              See more work on GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
          <RobotGuide chapter={chapter} paused={paused} onSpeaking={setSpeaking} />
        </div>
        <aside className="journey-evidence" key={chapter} aria-label={scene.label}>
          {chapter === 0 ? (
            <>
              <span className="mono evidence-label">BUILT WITH CURIOSITY</span>
              <p className="intro-aside">
                The engineering.
                <br />
                The person behind it.
              </p>
              <p>
                Each assembly reveals a different
                <br />
                part of my work. Scroll to begin.
              </p>
              <div className="intro-coordinates mono">
                <span>BACKEND / DATA / AI</span>
                <span>3 INTERNSHIPS. REAL SYSTEMS.</span>
              </div>
            </>
          ) : chapter === 2 ? (
            <ProjectSignals />
          ) : chapter === 5 ? (
            <>
              <div className="journey-film">{film}</div>
              <div className="education-signal">
                <strong>
                  8.8<small>/10 CGPA</small>
                </strong>
                <span>
                  B.Tech CSE
                  <br />
                  Class of 2027
                </span>
              </div>
              <button
                className="evidence-row"
                onClick={(e) => onInspect('foundation', e.currentTarget)}
              >
                Education & achievements{' '}
              </button>
            </>
          ) : chapter === 6 ? (
            <>
              <span className="mono evidence-label">ASSEMBLY COMPLETE</span>
              <p className="intro-aside">
                Human curiosity.
                <br />
                Machine precision.
              </p>
              <p>
                Backend engineering.
                <br />
                Intelligent workflows.
                <br />
                Thoughtful execution.
              </p>
              <a
                className="evidence-row"
                href="/samarth-mukhija-resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Take the résumé{' '}
              </a>
            </>
          ) : (
            <>
              <span className="mono evidence-label">
                {system.number} / {system.name.toUpperCase()}
              </span>
              {system.items.slice(0, 4).map((item, i) => (
                <button
                  key={item.title}
                  className="evidence-row"
                  onClick={(e) => onInspect(scene.system, e.currentTarget)}
                >
                  <span>
                    <small className="mono">0{i + 1}</small>
                    {item.title}
                    <em>{item.meta}</em>
                  </span>
                </button>
              ))}
              {chapter === 3 && (
                <div className="experience-signal">
                  <strong>100 GB+</strong>
                  <span>daily data processed at Clarista</span>
                </div>
              )}
            </>
          )}
        </aside>
        <div className="journey-bottom">
          <span className="mono journey-scroll-hint">
            {chapter === 6
              ? 'SCROLL TO CONNECT'
              : manual
                ? 'CHOOSE A CHAPTER'
                : 'SCROLL TO EXPLORE'}{' '}
          </span>
          <nav className="chapter-rail" aria-label="Portfolio chapters">
            {chapters.map((c, i) => (
              <button
                key={c.label}
                onClick={() => go(i)}
                aria-label={`${String(i).padStart(2, '0')} ${c.label}`}
                title={c.label}
                aria-current={chapter === i ? 'step' : undefined}
              >
                <span className="chapter-number">0{i}</span>
                <span className="chapter-label">{c.label}</span>
                <i />
              </button>
            ))}
          </nav>
          <span className="mono journey-progress">
            {String(Math.round(progress * 100)).padStart(3, '0')}
            <small> / EXPLORED</small>
          </span>
        </div>
        <div
          className="journey-progress-line"
          style={{ transform: `scaleX(${manual ? manualChapter / 6 : position / 6})` }}
        />
      </div>
    </section>
  );
}
