import React, { useState } from "react";

const Circle = () => {
  const [digit, setDigit] = useState(null);

  // Recursive function to create nested circles
  const createNestedCircle = (level) => {
    if (level <= 0) return null; // Base case to stop recursion

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
          style={{ padding: "0.5rem", width: "9rem" }}
          type="number"
          placeholder="enter "
          value={digit || ""}
          onChange={(e) => setDigit(e.target.value)}
        />
      </div>

      <div className="circle-container">
        {digit && createNestedCircle(Number(digit))}
      </div>
    </>
  );
};

export default Circle;
