import React, { useEffect, useReducer, useRef } from "react";

export const UseMyState = (value) => {
  const ref = useRef(value);
  const [, forceRender] = useReducer(() => ({}));

  const setState = (updatedValue) => {
    ref.current = updatedValue;
    forceRender();
  };

  return [ref.current, setState];
};
