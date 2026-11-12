import React from "react";

const ServiceCard = ({ name, description }) => {
  return (
    <div className="flex flex-col gap-3 p-3 laptop:p-4 -mx-3 laptop:-mx-4 rounded-lg transition-colors duration-200 ease-out hover:bg-surface">
      <h3 className="type-title">{name}</h3>
      {description ? <p className="type-supporting">{description}</p> : null}
    </div>
  );
};

export default ServiceCard;
