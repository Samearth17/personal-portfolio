import { useEffect, useRef, useState } from 'react';
import { systems, type SystemId } from './content';

export function Inspector({ id, close }: { id: SystemId | null; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<SystemId>('mind');
  const [expanded, setExpanded] = useState(0);
  const system = systems.find((s) => s.id === selected)!;
  useEffect(() => {
    const element = dialog.current;
    if (!id || !element) return;
    setSelected(id);
    setExpanded(0);
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [id]);
  return (
    <dialog
      ref={dialog}
      className="inspector"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      aria-labelledby="inspector-title"
    >
      <div className="inspector-top">
        <span className="personal-wordmark">
          samarth mukhija<span>Software engineer</span>
        </span>
        <span className="mono">SYSTEM INSPECTION / {system.number}</span>
        <button className="close-inspector" onClick={close}>
          Back to assembly
        </button>
      </div>
      <div className="inspector-body">
        <div className={`cutaway cutaway-${system.id}`}>
          <div className="cutaway-grid" />
          <span className="mono cutaway-label">{system.name} / DETAIL VIEW</span>
          <img
            key={system.image}
            src={`/media/${system.image}`}
            alt={`Robot ${system.name.toLowerCase()} detail`}
          />
          <div className="cutaway-reticle">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="cutaway-bottom">
            <span>PORTFOLIO / ENGINEERING</span>
            <span>
              {system.id === 'core' || system.id === 'source'
                ? 'CORE EXPOSED'
                : system.id === 'mind'
                  ? 'OPTICAL MODULE OPEN'
                  : 'ASSEMBLY DETAIL'}
            </span>
          </div>
        </div>
        <div className="inspection-content">
          <p className="eyebrow">
            {system.number} - {system.label}
          </p>
          <h2 id="inspector-title">{system.title}</h2>
          <p className="inspection-intro">{system.description}</p>
          <div className="inspection-items">
            {system.items.map((item, i) => (
              <article key={`${selected}-${i}`} className={expanded === i ? 'expanded' : ''}>
                <button
                  aria-expanded={expanded === i}
                  aria-controls={`inspection-item-${i}`}
                  onClick={() => setExpanded(expanded === i ? -1 : i)}
                >
                  <span className="mono">0{i + 1}</span>
                  <span>{item.title}</span>
                  <span>{expanded === i ? 'Hide' : 'Read'}</span>
                </button>
                <div id={`inspection-item-${i}`} hidden={expanded !== i}>
                  {item.meta && <p className="mono item-meta">{item.meta}</p>}
                  <p>{item.text}</p>
                  {item.href && (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {selected === 'source' ? 'View merged pull request' : 'Explore project'}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <a
            className="text-link"
            href="/samarth-mukhija-resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read the full résumé
          </a>
        </div>
      </div>
      <nav className="inspector-nav" aria-label="Robot subsystems">
        {systems.map((s) => (
          <button
            key={s.id}
            aria-pressed={selected === s.id}
            onClick={() => {
              setSelected(s.id);
              setExpanded(0);
            }}
          >
            <span>{s.number}</span>
            {s.label}
          </button>
        ))}
      </nav>
    </dialog>
  );
}
