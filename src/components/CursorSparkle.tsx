import { useEffect, useRef } from "react";

// Same upright glint shape as LightShines, as markup for elements created outside React
const GLINT_SVG =
  '<svg viewBox="0 0 24 32" fill="currentColor" width="100%" height="100%"><path d="M12 0 C12.4 10 12.9 14.6 20 16 C12.9 17.4 12.4 22 12 32 C11.6 22 11.1 17.4 4 16 C11.1 14.6 11.6 10 12 0 Z"/><circle cx="12" cy="16" r="2.2"/></svg>';

// Soft glow that follows the mouse, leaving a trail of small sparkles while it moves.
// Skipped on touch screens (no mouse) and when the visitor prefers reduced motion.
export function CursorSparkle() {
  const glowRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const glow = glowRef.current!;
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

    const onMove = (e: MouseEvent) => {
      glow.style.opacity = "1";
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // A sparkle every so often while moving, not on every tiny twitch
      const now = performance.now();
      const moved = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (now - lastSpawn > 45 && moved > 14) {
        spawnSparkle(e.clientX, e.clientY);
        lastSpawn = now;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[70]" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={layerRef} />
    </div>
  );
}
