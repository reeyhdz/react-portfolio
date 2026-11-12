import React from "react";
import Button from "../Button";
import data from "../../yourData";

const Socials = ({ className = "" }) => {
  return (
    <div className={`${className} flex flex-wrap gap-1`}>
      {data.socials.map((social) => {
        const isExternal = social.link.startsWith("http");
        return (
          <Button
            key={social.title}
            href={social.link}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {social.title}
          </Button>
        );
      })}
    </div>
  );
};

export default Socials;
