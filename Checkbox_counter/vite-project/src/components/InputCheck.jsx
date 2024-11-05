import React from "react";

export const InputCheck = ({ label, id, checked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        name="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
