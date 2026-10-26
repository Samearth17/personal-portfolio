import { useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';
import type { SystemId } from './content';

const hotspots: { id: SystemId; label: string; number: string }[] = [
  { id: 'mind', label: 'Explore introduction', number: '01' },
  { id: 'experience', label: 'Explore experience', number: '02' },
  { id: 'build', label: 'Explore selected projects', number: '03' },
  { id: 'source', label: 'Explore open source', number: '04' },
  { id: 'core', label: 'Explore technical toolkit', number: '05' },
  { id: 'foundation', label: 'Explore education and achievements', number: '06' },
];

function ModuleMechanism({ active }: { active: SystemId }) {
  return (
    <div className="robot-mechanism" data-module={active} key={active} aria-hidden="true">
      <div className="robot-module-cavity">
        <span className="robot-module-rim" />
        <svg className="robot-module-insert" viewBox="0 0 100 70" fill="none">
          {active === 'mind' && (
            <>
              <path d="M50 17c-6-9-20-7-22 3-11-1-17 9-12 18-5 10 3 19 13 18 4 9 15 10 21 3 6 7 17 6 21-3 10 1 18-8 13-18 5-9-1-19-12-18-2-10-16-12-22-3Z" />
              <path d="M50 17v42M28 20c9 1 9 9 8 13M20 38c9-4 15 0 17 7M72 20c-9 1-9 9-8 13M80 38c-9-4-15 0-17 7M38 36l8 5m16-5-8 5" />
              <circle cx="50" cy="41" r="4" />
            </>
          )}
          {active === 'experience' && (
            <>
              <circle cx="50" cy="35" r="24" />
              <circle cx="50" cy="35" r="15" />
              <path d="M50 5v13M50 52v13M20 35h13m34 0h13M30 15l9 10m22 20 9 10M70 15 61 25M39 45 30 55" />
              <circle cx="50" cy="35" r="5" />
            </>
          )}
          {active === 'build' && (
            <>
              <path d="M19 16h31v23H19zM50 27h31v27H50zM31 39v15h19M27 23h15M58 35h15M58 42h10" />
              <circle cx="21" cy="56" r="4" />
              <circle cx="79" cy="16" r="4" />
              <path d="M25 56h21M54 16h21" />
            </>
          )}
          {active === 'source' && (
            <>
              <path d="M20 35h23m0 0 17-18m-17 18 17 18M60 17h20M60 53h20" />
              <circle cx="17" cy="35" r="5" />
              <circle cx="45" cy="35" r="6" />
              <circle cx="64" cy="17" r="5" />
              <circle cx="64" cy="53" r="5" />
            </>
          )}
          {active === 'core' && (
            <>
              <rect x="32" y="17" width="36" height="36" rx="6" />
              <path d="M41 28h18v14H41zM24 25h8m-8 10h8m-8 10h8m36-20h8m-8 10h8m-8 10h8M40 10v7m10-7v7m10-7v7M40 53v7m10-7v7m10-7v7" />
              <circle cx="50" cy="35" r="4" />
            </>
          )}
          {active === 'foundation' && (
            <>
              <path d="M18 49h64M28 49V27l11-10 11 10v22M50 49V27l11-10 11 10v22M24 55h52" />
              <circle cx="39" cy="32" r="4" />
              <circle cx="61" cy="32" r="4" />
            </>
          )}
        </svg>
        <span className="robot-module-screw screw-a" />
        <span className="robot-module-screw screw-b" />
      </div>
      <span className="robot-module-hinge hinge-a" />
      <span className="robot-module-hinge hinge-b" />
      <img
        className="robot-module-hatch"
        src="/media/robot-90s-original.png"
        alt=""
        draggable={false}
      />
      <span className="robot-module-trace" />
    </div>
  );
}

export function RetroRobot({
  active,
  onSelect,
  motionPaused,
}: {
  active: SystemId | null;
  onSelect: (id: SystemId) => void;
  motionPaused: boolean;
}) {
  const robotRef = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    },
    [],
  );

  useEffect(() => {
    if (!motionPaused) return;
    if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = null;
    robotRef.current?.style.setProperty('--look-x', '0px');
    robotRef.current?.style.setProperty('--look-y', '0px');
    robotRef.current?.style.setProperty('--look-rotate', '0deg');
  }, [motionPaused]);

  const resetGaze = () => {
    if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = null;
    robotRef.current?.style.setProperty('--look-x', '0px');
    robotRef.current?.style.setProperty('--look-y', '0px');
    robotRef.current?.style.setProperty('--look-rotate', '0deg');
  };

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType === 'touch' ||
      motionPaused ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      const robot = robotRef.current;
      robot?.style.setProperty('--look-x', `${(x * 6).toFixed(2)}px`);
      robot?.style.setProperty('--look-y', `${(y * 4).toFixed(2)}px`);
      robot?.style.setProperty('--look-rotate', `${(x * 1.5).toFixed(2)}deg`);
      pointerFrame.current = null;
    });
  };

  return (
    <div
      className="robot-machine"
      data-active={active ?? 'none'}
      data-motion={motionPaused ? 'paused' : 'playing'}
      onPointerMove={followPointer}
      onPointerLeave={resetGaze}
      ref={robotRef}
    >
      <div className="robot-orbit orbit-outer" aria-hidden="true" />
      <div className="robot-orbit orbit-inner" aria-hidden="true" />
      <div className="robot-plinth" aria-hidden="true" />
      <div
        className="robot-art"
        role="img"
        aria-label={
          active
            ? `Friendly 1990s-inspired robot with its ${active === 'mind' ? 'head' : active === 'experience' ? 'core' : active === 'build' ? 'build arm' : active === 'source' ? 'signal arm' : active === 'core' ? 'circuitry' : 'foundation'} opened to reveal an internal component.`
            : 'Friendly 1990s-inspired robot assembled and ready to explore.'
        }
      >
        <div className="robot-float">
          <div className="robot-performer">
            <img
              className="robot-assembled"
              src="/media/robot-90s-original.png"
              alt=""
              draggable={false}
            />
            {active && <ModuleMechanism active={active} />}
          </div>
        </div>
      </div>
      <div className="robot-annotation annotation-b" aria-hidden="true">
        <i />
        <span>MODULAR SYSTEM</span>
      </div>
      {hotspots.map(({ id, label, number }) => (
        <button
          key={id}
          className={`robot-hotspot hotspot-${id} ${active === id ? 'is-active' : ''}`}
          type="button"
          aria-label={label}
          aria-pressed={active === id}
          onClick={() => onSelect(id)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
