import React from "react";
import Button from "../Button";
import data from "../../yourData";

const Header = ({ handleWorkScroll, handleAboutScroll, headerRef }) => {
  return (
    <header ref={headerRef} className="site-header">
      <nav className="flex flex-wrap items-center gap-1" aria-label="Principal">
        <Button onClick={handleWorkScroll}>Trabajos</Button>
        <Button onClick={handleAboutScroll}>Acerca de</Button>
        <Button href={data.email}>Contacto</Button>
      </nav>
    </header>
  );
};

export default Header;
