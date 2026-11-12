import { useLayoutEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const MAX_PULL = 14;

const MagneticName = ({ text, className = "" }) => {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    const chars = charsRef.current.filter(Boolean);
    if (!chars.length) return undefined;

    const origins = chars.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    const refreshOrigins = () => {
      chars.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        origins[i] = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const tick = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const { x, y, active } = pointerRef.current;
      chars.forEach((el, i) => {
        const origin = origins[i];
        if (!active) {
          el.style.transform = "translate3d(0,0,0)";
          return;
        }
        const dx = x - origin.x;
        const dy = y - origin.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, 1 - dist / 220);
        const pull = force * force * MAX_PULL;
        const tx = (dx / dist) * pull;
        const ty = (dy / dist) * pull;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      pointerRef.current = { ...pointerRef.current, active: false };
    };

    const hero = root.closest(".section-hero") || root;
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", refreshOrigins);
    window.addEventListener("scroll", refreshOrigins, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", refreshOrigins);
      window.removeEventListener("scroll", refreshOrigins);
      chars.forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [reducedMotion, text]);

  if (reducedMotion) {
    return <em className={`name-accent ${className}`}>{text}</em>;
  }

  return (
    <em ref={rootRef} className={`name-accent magnetic-name ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((char, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${char}-${i}`}
            ref={(el) => {
              charsRef.current[i] = el;
            }}
            className="magnetic-name__char"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </em>
  );
};

export default MagneticName;
