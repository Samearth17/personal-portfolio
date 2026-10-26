import { useEffect, useRef, type CSSProperties } from 'react';
import { systems, type SystemId } from './content';
import { robotMotion } from './robotMotion';

// All pieces share one authored image plane. Clip boundaries follow the major assemblies.
const pieces = [
  { name: 'Cranial assembly', clip: '0,0 1024,0 1024,225 0,225', x: 0, y: -150, r: -3 },
  { name: 'Left shoulder', clip: '0,225 400,225 400,365 350,455 0,455', x: -175, y: -65, r: -15 },
  {
    name: 'Right shoulder',
    clip: '650,225 1024,225 1024,465 700,465 650,360',
    x: 180,
    y: -40,
    r: 16,
  },
  { name: 'Neck mechanism', clip: '400,225 650,225 650,278 400,278', x: 0, y: -88, r: 0 },
  {
    name: 'Left thoracic plate',
    clip: '400,278 540,278 540,420 470,450 350,455 400,365',
    x: -95,
    y: -20,
    r: -17,
  },
  { name: 'Core', clip: '540,278 610,278 610,410 540,420', x: 0, y: -15, r: 0 },
  {
    name: 'Right thoracic plate',
    clip: '610,278 650,278 650,360 700,465 625,465 610,410',
    x: 130,
    y: 0,
    r: 20,
  },
  {
    name: 'Abdominal mechanism',
    clip: '350,455 470,450 540,420 610,410 625,465 700,465 700,595 350,595',
    x: 0,
    y: 40,
    r: 0,
  },
  { name: 'Left forearm', clip: '0,455 350,455 350,695 0,695', x: -195, y: 75, r: 12 },
  { name: 'Left hand', clip: '0,695 350,695 350,875 0,875', x: -210, y: 155, r: 22 },
  { name: 'Right forearm', clip: '700,465 1024,465 1024,710 700,710', x: 185, y: 100, r: -12 },
  { name: 'Right hand', clip: '700,710 1024,710 1024,875 700,875', x: 220, y: 175, r: -22 },
  { name: 'Pelvis', clip: '350,595 700,595 700,695 350,695', x: 0, y: 90, r: 0 },
  { name: 'Left thigh', clip: '350,695 560,695 560,990 350,990', x: -70, y: 155, r: 8 },
  {
    name: 'Right thigh',
    clip: '560,695 700,695 700,875 1024,875 1024,990 560,990',
    x: 80,
    y: 170,
    r: -8,
  },
  {
    name: 'Left shin',
    clip: '0,875 350,875 350,990 560,990 560,1315 0,1315',
    x: -100,
    y: 235,
    r: 8,
  },
  { name: 'Right shin', clip: '560,990 1024,990 1024,1315 560,1315', x: 120, y: 250, r: -8 },
  { name: 'Left foot', clip: '0,1315 540,1315 540,1536 0,1536', x: -145, y: 310, r: 12 },
  { name: 'Right foot', clip: '540,1315 1024,1315 1024,1536 540,1536', x: 170, y: 325, r: -12 },
];

const anchors: Record<SystemId, { x: number; y: number; part: number }> = {
  mind: { x: 540, y: 135, part: 0 },
  core: { x: 574, y: 346, part: 5 },
  build: { x: 263, y: 586, part: 8 },
  experience: { x: 755, y: 605, part: 10 },
  source: { x: 544, y: 521, part: 7 },
  foundation: { x: 634, y: 1110, part: 16 },
};

export function Robot({
  onInspect,
  reduced,
  activeSystem,
  position = 0,
}: {
  position?: number;
  onInspect: (id: SystemId, trigger: HTMLButtonElement) => void;
  reduced: boolean;
  activeSystem?: SystemId;
}) {
  const surface = useRef<HTMLDivElement>(null);
  const motion = robotMotion(position);
  const exploded = motion.isolation > 0.08;
  const amountFor = (i: number) => motion.pieces[i].open;
  const panelX = (i: number) => ([4, 6].includes(i) ? pieces[i].x : pieces[i].x * 0.3);
  const panelY = (i: number) => (i === 0 ? -80 : pieces[i].y * 0.2);
  useEffect(() => {
    const element = surface.current;
    if (!element || reduced) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      element.style.setProperty('--look-x', `${x * 14}deg`);
      element.style.setProperty('--look-y', `${-y * 9}deg`);
      element.style.setProperty('--head-look-x', `${x * 13}px`);
      element.style.setProperty('--head-look-y', `${y * 8}px`);
      element.style.setProperty('--head-roll', `${x * 4}deg`);
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
      y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2));
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const reset = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', track, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('pointermove', track);
      window.removeEventListener('blur', reset);
      cancelAnimationFrame(frame);
      element.style.removeProperty('--look-x');
      element.style.removeProperty('--look-y');
      element.style.removeProperty('--head-look-x');
      element.style.removeProperty('--head-look-y');
      element.style.removeProperty('--head-roll');
    };
  }, [reduced]);
  return (
    <div className={`robot-surface ${exploded ? 'is-exploded' : ''}`} ref={surface}>
      <div className="robot-orbit orbit-one" />
      <div className="robot-orbit orbit-two" />

      <div
        className="robot-model"
        style={{ '--assembly-scale': 1, '--camera-zoom': motion.zoom } as CSSProperties}
      >
        <div
          className="robot-coordinate-plane focused-coordinate-plane"
          style={{
            transform: `translateX(-50%) scale(${motion.zoom}) translate(${((512 - motion.x) / 1464) * 100}%, ${((865 - motion.y) / 2110) * 100}%)`,
          }}
        >
          <svg
            viewBox="-220 -190 1464 2110"
            role="img"
            aria-label={
              exploded
                ? 'Robot with its mechanical assemblies separated for inspection'
                : 'Silver humanoid robot with a luminous core'
            }
          >
            <defs>
              <clipPath id="core-interior">
                <path d="M434 245L475 232L540 265L622 270L688 245L742 259L782 295L793 385L769 469L695 516L642 542L577 518L521 520L467 487L419 421L399 341Z" />
              </clipPath>
              {pieces.map((p, i) => (
                <clipPath key={p.name} id={`assembly-${i}`}>
                  <polygon points={p.clip} />
                </clipPath>
              ))}
            </defs>
            <image
              href="/media/robot-core-open.png"
              width="1024"
              height="1536"
              clipPath="url(#core-interior)"
              opacity={motion.core}
            />
            <g className="robot-head-track">
              <image
                href="/media/robot-optics-open.png"
                width="1024"
                height="1536"
                clipPath="url(#assembly-0)"
                opacity={motion.optics}
              />
              <g
                className="robot-piece"
                opacity={motion.pieces[0].opacity * (1 - motion.optics)}
                style={{
                  transform: `translate(${panelX(0) * amountFor(0)}px, ${panelY(0) * amountFor(0)}px) rotate(${pieces[0].r * amountFor(0)}deg)`,
                  transformOrigin: '512px 760px',
                }}
              >
                <image
                  href="/media/robot-overview.png"
                  width="1024"
                  height="1536"
                  clipPath="url(#assembly-0)"
                />
              </g>
            </g>
            {pieces.slice(1).map((p, offset) => {
              const i = offset + 1;
              const amount = amountFor(i);
              const shellFade = [4, 5, 6].includes(i) ? 1 - motion.core : 1;
              return (
                <g
                  key={p.name}
                  className="robot-piece"
                  opacity={motion.pieces[i].opacity * shellFade}
                  style={{
                    transform: `translate(${panelX(i) * amount}px, ${panelY(i) * amount}px) rotate(${p.r * amount}deg)`,
                    transformOrigin: '512px 760px',
                  }}
                >
                  <image
                    href="/media/robot-overview.png"
                    width="1024"
                    height="1536"
                    clipPath={`url(#assembly-${i})`}
                  />
                </g>
              );
            })}
          </svg>
          <div className="robot-point-plane" data-active-system={activeSystem}>
            {systems.map((s) => {
              const visible =
                !activeSystem ||
                s.id === activeSystem ||
                (activeSystem === 'mind' && s.id === 'foundation');
              const a = anchors[s.id];
              const p = pieces[a.part];
              const amount = amountFor(a.part);
              const angle = (p.r * amount * Math.PI) / 180;
              const x =
                512 +
                (a.x - 512) * Math.cos(angle) -
                (a.y - 760) * Math.sin(angle) +
                panelX(a.part) * amount;
              const y =
                760 +
                (a.x - 512) * Math.sin(angle) +
                (a.y - 760) * Math.cos(angle) +
                panelY(a.part) * amount;
              return (
                <button
                  key={s.id}
                  className={`system-point point-${s.id}`}
                  style={{
                    left: `${((x + 220) / 1464) * 100}%`,
                    top: `${((y + 190) / 2110) * 100}%`,
                    opacity: visible ? 1 : 0,
                    pointerEvents: visible ? 'auto' : 'none',
                    transform: `translate(-50%,-50%) scale(${1 / motion.zoom})`,
                  }}
                  tabIndex={visible ? 0 : -1}
                  aria-hidden={visible ? undefined : true}
                  aria-label={`Inspect ${s.label}`}
                  onClick={(e) => onInspect(s.id, e.currentTarget)}
                >
                  <span className="point-plus">
                    <i />
                  </span>
                  <span className="point-label">
                    <small>
                      {s.number} / {s.name}
                    </small>
                    {s.label}
                    <span></span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="robot-caption">
        <span className="status-dot" /> {exploded ? 'SUBSYSTEM IN FOCUS' : 'ALL SYSTEMS CONNECTED'}
        <span>ENGINEERING PROFILE</span>
      </div>
    </div>
  );
}
