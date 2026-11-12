import React from "react";

const baseClass =
  "type-nav ui-pressable inline-flex items-center justify-center min-h-11 px-3 py-2 rounded-lg first:ml-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const Button = ({ children, type, onClick, href, target, rel }) => {
  const className =
    type === "primary"
      ? `${baseClass} text-canvas bg-brand hover:bg-brand-strong`
      : `${baseClass} text-ink hover:bg-brand-soft hover:text-brand-strong`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
