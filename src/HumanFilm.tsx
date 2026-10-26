import { useCallback, useEffect, useRef, useState } from 'react';
import { filmTime } from './mediaUtils';

export function HumanFilm({ reduced }: { reduced: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const frame = useRef(0);
  const previousX = useRef<number | null>(null);
  const [position, setPosition] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const seek = useCallback(() => {
    const element = video.current;
    if (!element || element.seeking || !Number.isFinite(element.duration)) return;
    if (Math.abs(element.currentTime - target.current) < 0.025) return;
    try {
      element.currentTime = target.current;
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const update = (fraction: number) => {
    const element = video.current;
    if (!ready || failed || !element) return;
    target.current = filmTime(fraction, element.duration);
    setPosition((target.current / element.duration) * 100);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(seek);
  };

  return (
    <div
      className="human-film"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse' || !ready) return;
        if (previousX.current === null) {
          previousX.current = event.clientX;
          return;
        }
        const delta = event.clientX - previousX.current;
        previousX.current = event.clientX;
        const element = video.current;
        const width = event.currentTarget.getBoundingClientRect().width;
        if (element && width > 0) update(target.current / element.duration + (delta / width) * 0.8);
      }}
      onPointerLeave={() => {
        previousX.current = null;
      }}
    >
      <video
        ref={video}
        src="/media/aria-motion.mp4"
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={() =>
          setReady(Number.isFinite(video.current?.duration) && (video.current?.duration ?? 0) > 0)
        }
        onSeeked={seek}
        onError={() => setFailed(true)}
        aria-label="A person with an expressive retro computer for a head"
      />
      <span className="film-tag mono">
        <span className="status-dot" /> A LITTLE HUMAN. A LITTLE MACHINE.
      </span>
      {failed && (
        <p className="film-fallback" role="status">
          The character film couldn’t load. The portfolio is still available.
        </p>
      )}
      <div className="film-controls">
        <span className="mono">MEET THE OTHER SIDE</span>
        <label>
          <span className="sr-only">Scrub the character film</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            disabled={!ready || failed}
            value={position}
            aria-valuetext={`${Math.round(position)} percent`}
            onChange={(event) => update(Number(event.target.value) / 100)}
          />
        </label>
      </div>
    </div>
  );
}
