import React, { useState, useEffect } from "react";
import { ClampValue } from "./utils";

const ProgressBar = ({ PercentageValue, min, max }) => {
  const [value, setValue] = useState(0); //state which hoold the value to reach the defined percentage value
  const [startAnimation, setstartAnimation] = useState(false);
  const clamp = ClampValue(PercentageValue, min, max);
  // Function which increase the value on mount

  useEffect(() => {
    if (startAnimation && value < clamp) {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev < clamp) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 100);

      return () => clearInterval(interval); //clear interval on unmount
    }
  }, [startAnimation, clamp, value]);

  //dependency array percentage value so that on chnage of this it will run again
  const handleStart = () => {
    setstartAnimation(true);
  };

  const handleStop = () => {
    setstartAnimation(false);
  };
  return (
    <>
      {" "}
      <div
        className="progress"
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.floor(value)}
        aria-label={`Progress: ${Math.floor(value)}%`}
      >
        {/* percentage value */}
        <span style={{ color: value > 49 ? "white" : "black" }}>
          {Math.floor(value)}%
        </span>
        {/* color loader div */}
        <div style={{ width: `${value}%` }} />
      </div>
      <div className="button">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <span>{startAnimation ? "loading..." : "waiting"}</span>
    </>
  );
};

export default ProgressBar;
