import React from "react";

export const Button = ({ onClick, value, disabled }) => {
  return (
    <div>
      <button onClick={onClick} disabled={disabled}>
        {value}
      </button>
    </div>
  );
};
