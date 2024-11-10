import { useState } from "react";

const Circle = () => {
  const [value, setValue] = useState("");

  const createNestedCircle = (level) => {
    if (level <= 0) return null;
    return (
      <div className="circle" key={level}>
        {createNestedCircle(level - 1)}
      </div>
    );
  };

  return (
    <>
      <div className="input">
        <input
          type="number"
          name="digit"
          id="digit"
          value={value}
          placeholder="Enter any digit"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="circle-container">
        {value && createNestedCircle(Number(value))}
      </div>
    </>
  );
};

export default Circle;
