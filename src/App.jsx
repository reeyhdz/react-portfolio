import { useCallback, useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import HeroField from "./components/HeroField";
import MagneticName from "./components/MagneticName";
import ProjectOverlay from "./components/ProjectOverlay";
import ServiceCard from "./components/ServiceCard";
import Socials from "./components/Socials";
import WorkCard from "./components/WorkCard";
import useViewTransition from "./hooks/useViewTransition";
import data from "./yourData";

const projectKey = (project) =>
  project.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function App() {
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const headerRef = useRef(null);
  const lastFocusRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const startTransition = useViewTransition();

  const scrollTo = (ref) => {
    if (!ref.current) return;
    const headerOffset = (headerRef.current?.offsetHeight ?? 72) + 16;
    const top =
      window.scrollY + ref.current.getBoundingClientRect().top - headerOffset;
    window.scrollTo({ top, left: 0, behavior: "smooth" });
  };

  const openProject = useCallback(
    (project) => {
      lastFocusRef.current = document.activeElement;
      startTransition(() => setActiveProject(project));
    },
    [startTransition]
  );

  const closeProject = useCallback(() => {
    const restore = lastFocusRef.current;
    const transition = startTransition(() => setActiveProject(null));
    const focusBack = () => {
      if (restore && typeof restore.focus === "function") {
        restore.focus();
      }
    };
    if (transition?.finished) {
      transition.finished.then(focusBack).catch(focusBack);
    } else {
      focusBack();
    }
  }, [startTransition]);

  const activeKey = activeProject ? projectKey(activeProject) : null;
  const shellRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    if (activeProject) shell.setAttribute("inert", "");
    else shell.removeAttribute("inert");
  }, [activeProject]);

  return (
    <>
      <Analytics />
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <div className="page-shell" ref={shellRef}>
        <Header
          headerRef={headerRef}
          handleWorkScroll={() => scrollTo(workRef)}
          handleAboutScroll={() => scrollTo(aboutRef)}
        />
        <main id="main-content">
          <section className="section-hero" aria-labelledby="hero-heading">
            <HeroField />
            <div className="hero-block">
              <h1 id="hero-heading" className="type-display max-w-5xl text-balance">
                {data.headerTaglineOne} <br />
                Soy <MagneticName text={data.name} /> — {data.headerTaglineTwo}
              </h1>
              <Socials />
            </div>
          </section>

          <section
            className="section-cluster section-stack scroll-mt-24"
            ref={aboutRef}
            aria-labelledby="about-heading"
          >
            <h2 id="about-heading" className="type-section">
              Acerca de mí
            </h2>
            <p className="type-body">{data.aboutpara}</p>
          </section>

          <section
            className="section-cluster section-stack"
            aria-labelledby="services-heading"
          >
            <h2 id="services-heading" className="type-section">
              Servicios
            </h2>
            <div className="services-grid">
              {data.services.map((service) => (
                <ServiceCard
                  key={service.title}
                  name={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </section>

          <section
            className="section-chapter section-stack"
            ref={workRef}
            aria-labelledby="work-heading"
          >
            <h2 id="work-heading" className="type-section">
              Proyectos
            </h2>
            <div className="work-grid">
              {data.projects.map((project, index) => {
                const key = projectKey(project);
                return (
                  <WorkCard
                    key={project.title}
                    img={project.imageSrc}
                    name={project.title}
                    description={project.description}
                    url={project.url}
                    featured={index === 0}
                    transitionName={`project-${key}`}
                    active={activeKey === key}
                    onOpen={() => openProject(project)}
                  />
                );
              })}
            </div>
          </section>

          <section
            className="section-close section-stack"
            aria-labelledby="contact-heading"
          >
            <h2 id="contact-heading" className="type-section">
              Contacto
            </h2>
            <Socials />
          </section>
        </main>
        <p className="type-meta mt-8 laptop:mt-10">
          Hecho con ❤ por Irving Acosta
        </p>
      </div>

      {activeProject ? (
        <ProjectOverlay
          project={activeProject}
          transitionName={`project-${activeKey}`}
          onClose={closeProject}
        />
      ) : null}
    </>
  );
}
