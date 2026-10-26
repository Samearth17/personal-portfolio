import { useCallback, useEffect, useRef, useState } from 'react';

const greetings = [
  'Welcome. I’m your guide to Samarth’s portfolio. Open a system to explore his engineering, projects, and experience.',
  'This is the engineering core. Samarth works with Python, backend APIs, data infrastructure, and intelligent workflows.',
  'The build arm turns ideas into working products. Explore IPO Intelligence and the six-agent document extraction system.',
  'The delivery arm represents real-world experience, from data pipelines at Clarista to product engineering at MyTegami and AI initiatives with Southern Command.',
  'The backbone is collaboration. Explore Samarth’s contributions to Microsoft, Apache, IBM, and Soup.',
  'Behind the systems is a curious human. Samarth studies Computer Science in Pune and enjoys building, competing, and learning.',
  'Now you’ve met the parts and the person. If you have a role, project, or idea in mind, leave Samarth a message below.',
];

type VoiceStatus = 'idle' | 'speaking' | 'unavailable';
export function RobotGuide({
  chapter,
  paused,
  onSpeaking,
}: {
  chapter: number;
  paused: boolean;
  onSpeaking: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const watchdog = useRef(0);
  const greeting = greetings[chapter] ?? greetings[0];

  const cancel = useCallback(() => {
    clearTimeout(watchdog.current);
    const line = utterance.current;
    if (line) {
      line.onstart = null;
      line.onend = null;
      line.onerror = null;
      utterance.current = null;
      window.speechSynthesis?.cancel();
    }
    onSpeaking(false);
  }, [onSpeaking]);

  useEffect(() => {
    const hide = () => {
      if (document.hidden) {
        cancel();
        setStatus('idle');
      }
    };
    document.addEventListener('visibilitychange', hide);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      cancel();
    };
  }, [cancel]);

  useEffect(() => {
    if (paused) {
      cancel();
      setStatus('idle');
    }
  }, [paused, cancel]);

  const speak = () => {
    setOpen(true);
    if (status === 'speaking') {
      cancel();
      setStatus('idle');
      return;
    }
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setStatus('unavailable');
      return;
    }
    cancel();
    try {
      const line = new SpeechSynthesisUtterance(greeting);
      utterance.current = line;
      line.lang = 'en-US';
      line.rate = 0.96;
      const voice = window.speechSynthesis
        .getVoices()
        .find((v) => v.localService && v.lang.startsWith('en'));
      if (voice) line.voice = voice;
      line.onstart = () => {
        clearTimeout(watchdog.current);
        onSpeaking(true);
      };
      line.onend = () => {
        cancel();
        setStatus('idle');
      };
      line.onerror = () => {
        cancel();
        setStatus('unavailable');
      };
      setStatus('speaking');
      watchdog.current = window.setTimeout(() => {
        cancel();
        setStatus('unavailable');
      }, 5000);
      window.speechSynthesis.speak(line);
    } catch {
      cancel();
      setStatus('unavailable');
    }
  };

  return (
    <div
      className={`robot-guide ${status === 'speaking' ? 'is-speaking' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          cancel();
          setStatus('idle');
        }
      }}
    >
      <div className="guide-controls">
        <button onClick={speak} aria-pressed={status === 'speaking'}>
          <span className="voice-bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          {status === 'speaking' ? 'Stop voice' : 'Hear from the robot'}
        </button>
        <button
          className="guide-transcript-toggle"
          aria-expanded={open}
          aria-controls="robot-transcript"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide text' : 'Read greeting'}
        </button>
      </div>
      <div className="guide-transcript" id="robot-transcript" hidden={!open}>
        <p>{greeting}</p>
        {status === 'unavailable' && (
          <p role="status" className="voice-note">
            Voice isn’t available in this browser. You can read the greeting here.
          </p>
        )}
        <span className="voice-note">Scripted portfolio guide. Voice is optional.</span>
      </div>
    </div>
  );
}
