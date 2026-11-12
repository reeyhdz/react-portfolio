import { useEffect, useId, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ProjectOverlay = ({ project, transitionName, onClose }) => {
  const panelRef = useRef(null);
  const titleId = useId();
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Prefer primary action for keyboard users
    const focusTimer = window.setTimeout(() => {
      ctaRef.current?.focus();
    }, 0);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = [
        ...panelRef.current.querySelectorAll(FOCUSABLE),
      ].filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!panelRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="project-overlay__backdrop"
        aria-hidden="true"
        onClick={onClose}
        onKeyDown={undefined}
      />
      <div className="project-overlay__panel" ref={panelRef}>
        <div
          className="project-overlay__media"
          style={{ viewTransitionName: transitionName }}
        >
          <img
            src={project.imageSrc}
            alt={`Captura de ${project.title}`}
            width={1280}
            height={800}
          />
        </div>
        <div className="project-overlay__body">
          <h2 id={titleId} className="type-title">
            {project.title}
          </h2>
          {project.description ? (
            <p className="type-supporting">{project.description}</p>
          ) : null}
          <div className="project-overlay__actions">
            <a
              ref={ctaRef}
              className="type-nav ui-pressable project-overlay__cta"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar sitio
            </a>
            <button
              type="button"
              className="type-nav ui-pressable project-overlay__close"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverlay;
