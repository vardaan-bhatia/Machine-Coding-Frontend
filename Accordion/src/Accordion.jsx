import React from "react";
import { items } from "./index";
import AccordionItem from "./AccordionItem";
import { useState } from "react";

const Accordion = () => {
  const [openIndex, setopenIndex] = useState(null);

  const handleOpenIndex = (index) => {
    setopenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <section>
        <div className="accordion">
          <h1 style={{ textAlign: "center", fontSize: "30px" }}>
            Accordion Example
          </h1>
          <div className="main">
            <ul className="list">
              {items.map((e, index) => (
                <AccordionItem
                  key={index}
                  item={e.title}
                  subitem={e.content}
                  onclick={() => handleOpenIndex(index)}
                  isopen={openIndex == index}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accordion;
