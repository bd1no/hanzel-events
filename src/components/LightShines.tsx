import { useEffect, useState } from "react";

// Upright light glint: long vertical rays, shorter horizontal ones, bright core
function GlintStar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 32" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0 C12.4 10 12.9 14.6 20 16 C12.9 17.4 12.4 22 12 32 C11.6 22 11.1 17.4 4 16 C11.1 14.6 11.6 10 12 0 Z" />
      <circle cx="12" cy="16" r="2.2" />
    </svg>
  );
}

type Shine = { id: number; top: number; left: number; size: number };

// Random glints of light that flash briefly across the page, a few at a time.
// They sit in front of the glass panels; behind them the blur turns them into dots.
export function LightShines({ every = 700 }: { every?: number }) {
  const [shines, setShines] = useState<Shine[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let nextId = 0;
    const timer = window.setInterval(() => {
      const shine: Shine = {
        id: nextId++,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 22 + Math.random() * 30,
      };
      setShines((current) => [...current.slice(-5), shine]);
      // Drop it once its 1.6s animation has finished
      window.setTimeout(() => {
        setShines((current) => current.filter((s) => s.id !== shine.id));
      }, 1700);
    }, every);

    return () => window.clearInterval(timer);
  }, [every]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
      {shines.map((s) => (
        <GlintStar
          key={s.id}
          className="light-shine"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size * (32 / 24) }}
        />
      ))}
    </div>
  );
}
