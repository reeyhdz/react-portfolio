import React from "react";
import Button from "../Button";
const Header = ({ handleWorkScroll, handleAboutScroll }) => {
  return (
    <div className="mt-6 flex items-center justify-between sticky top-0 z-10 bg-white">
      <div>
        <Button onClick={handleWorkScroll}>Trabajos</Button>
        <Button onClick={handleAboutScroll}>Acerca de</Button>
        <Button onClick={() => window.open("mailto:reeyhdz@gmail.com")}>
          Contacto
        </Button>
      </div>
    </div>
  );
};

export default Header;
