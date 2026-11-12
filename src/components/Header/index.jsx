import React from "react";
import Button from "../Button";
import data from "../../yourData";

const Header = ({ handleWorkScroll, handleAboutScroll, headerRef }) => {
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-10 -mx-[var(--page-gutter)] px-[var(--page-gutter)] py-2 bg-canvas border-b border-line pt-[max(0.5rem,env(safe-area-inset-top))]"
    >
      <nav className="flex flex-wrap items-center gap-1" aria-label="Principal">
        <Button onClick={handleWorkScroll}>Trabajos</Button>
        <Button onClick={handleAboutScroll}>Acerca de</Button>
        <Button href={data.email}>Contacto</Button>
      </nav>
    </header>
  );
};

export default Header;
