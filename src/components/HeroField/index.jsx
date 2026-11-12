import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * Soft indigo field that follows the pointer inside the hero.
 * Pure CSS variables — no canvas. Disabled for reduced motion / coarse pointers.
 */
const HeroField = () => {
  const reducedMotion = usePrefersReducedMotion();
  const fieldRef = useRef(null);
  const target = useRef({ x: 50, y: 40 });
  const current = useRef({ x: 50, y: 40 });
  const rafRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const field = fieldRef.current;
    const hero = field?.closest(".section-hero");
    if (!field || !hero) return undefined;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const t = activeRef.current ? 0.12 : 0.06;
      current.current.x = lerp(current.current.x, target.current.x, t);
      current.current.y = lerp(current.current.y, target.current.y, t);
      field.style.setProperty("--field-x", `${current.current.x}%`);
      field.style.setProperty("--field-y", `${current.current.y}%`);
      field.dataset.active = activeRef.current ? "true" : "false";
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };
      activeRef.current = true;
    };
    const onLeave = () => {
      activeRef.current = false;
      target.current = { x: 50, y: 40 };
    };

    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={fieldRef} className="hero-field" aria-hidden="true" />;
};

export default HeroField;
