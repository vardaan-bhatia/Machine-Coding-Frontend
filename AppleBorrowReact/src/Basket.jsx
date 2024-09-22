import React from "react";

function Basket(prop) {
  return (
    <div className="basket">
      <h1>{prop.apples} Apples</h1>
      <p>{prop.label}</p>
    </div>
  );
}

export default Basket;
