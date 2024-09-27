import React from "react";
const AccordionItem = ({ item, subitem, onclick, isopen }) => {
  return (
    <div className="accordion-item">
      <div className="header" onClick={onclick}>
        <h1>{item}</h1>
        <span>{open ? "-" : "+"}</span>
      </div>{" "}
      {isopen && <p className="subitem">{subitem}</p>}
    </div>
  );
};

export default AccordionItem;
