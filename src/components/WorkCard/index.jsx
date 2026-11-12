import React from "react";

const WorkCard = ({
  img,
  name,
  description,
  url,
  featured = false,
  transitionName,
  active = false,
  onOpen,
}) => {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onOpen?.();
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-haspopup="dialog"
      className={`group work-card rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        featured ? "work-card--featured" : ""
      }`}
    >
      <div
        className="work-media"
        style={{
          viewTransitionName: active ? "none" : transitionName,
        }}
      >
        <img
          alt={name ? `Captura de ${name}` : "Captura del proyecto"}
          className="h-full w-full object-cover object-top"
          src={img}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          width={1280}
          height={800}
        />
      </div>
      <div className="work-card__meta">
        <h3 className="type-title transition-colors duration-200 group-hover:text-brand group-focus-visible:text-brand">
          {name}
        </h3>
        {description ? <p className="type-supporting">{description}</p> : null}
      </div>
    </a>
  );
};

export default WorkCard;
