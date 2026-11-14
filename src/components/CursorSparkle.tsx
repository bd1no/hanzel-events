import { useEffect, useRef } from "react";

// Same upright glint shape as LightShines, as markup for elements created outside React
const GLINT_SVG =
  '<svg viewBox="0 0 24 32" fill="currentColor" width="100%" height="100%"><path d="M12 0 C12.4 10 12.9 14.6 20 16 C12.9 17.4 12.4 22 12 32 C11.6 22 11.1 17.4 4 16 C11.1 14.6 11.6 10 12 0 Z"/><circle cx="12" cy="16" r="2.2"/></svg>';

// Sections where the trail turns into cherry blossom petals (when petals are on)
const PETAL_SECTIONS = "#services, #stories";

// Trail of small sparkles that follows the mouse while it moves. With `petals` on,
// it drops cherry blossom petals instead while over the petal sections.
// Skipped on touch screens (no mouse) and when the visitor prefers reduced motion.
export function CursorSparkle({ petals = false }: { petals?: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null);
  // Read inside the mouse handler, so changing it doesn't re-attach the listener
  const petalsRef = useRef(petals);
  petalsRef.current = petals;

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const layer = layerRef.current!;
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;

    const spawnSparkle = (x: number, y: number) => {
      const size = 8 + Math.random() * 10;
      const sparkle = document.createElement("span");
      sparkle.className = "cursor-sparkle";
      sparkle.innerHTML = GLINT_SVG;
      sparkle.style.left = `${x + (Math.random() - 0.5) * 18}px`;
      sparkle.style.top = `${y + (Math.random() - 0.5) * 18}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size * (32 / 24)}px`;
      sparkle.addEventListener("animationend", () => sparkle.remove());
      layer.appendChild(sparkle);
    };

    const spawnPetal = (x: number, y: number) => {
      const width = 8 + Math.random() * 5;
      const petal = document.createElement("span");
      petal.className = "cursor-petal";
      petal.style.left = `${x + (Math.random() - 0.5) * 16}px`;
      petal.style.top = `${y + (Math.random() - 0.5) * 16}px`;
      petal.style.width = `${width}px`;
      petal.style.height = `${width * 1.25}px`;
      petal.style.setProperty("--petal-drift", `${(Math.random() - 0.5) * 60}px`);
      petal.style.setProperty("--petal-spin", `${(Math.random() < 0.5 ? -1 : 1) * (120 + Math.random() * 120)}deg`);
      petal.addEventListener("animationend", () => petal.remove());
      layer.appendChild(petal);
    };

    const onMove = (e: MouseEvent) => {
      // A sparkle every so often while moving, not on every tiny twitch
      const now = performance.now();
      const moved = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (now - lastSpawn > 45 && moved > 14) {
        const overPetalSection =
          petalsRef.current && e.target instanceof Element && e.target.closest(PETAL_SECTIONS);
        if (overPetalSection) {
          spawnPetal(e.clientX, e.clientY);
        } else {
          spawnSparkle(e.clientX, e.clientY);
        }
        lastSpawn = now;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={layerRef} className="fixed inset-0 pointer-events-none z-[70]" aria-hidden="true" />
  );
}
