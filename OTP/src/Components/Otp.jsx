import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "../index.css";

const Otp = ({ Length = 6, phoneNumber }) => {
  const otpBoxes = new Array(Length).fill("");
  const [otpField, setotpField] = useState(otpBoxes);
  const ref = useRef([]);

  const handleKey = (e, index) => {
    const key = e.key;
    const copyfield = [...otpField];
    if (key == "Backspace") {
      copyfield[index] = "";
      setotpField(copyfield);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }
    if (key == "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }

    if (key == "ArrowRight") {
      if (index < otpField.length - 1) {
        ref.current[index + 1].focus();
      }
    }
    if (key >= 0 && key <= 9) {
      copyfield[index] = key;
      if (index < otpField.length - 1) {
        ref.current[index + 1].focus();
      }
      setotpField(copyfield);
    }
  };
  useEffect(() => {
    ref.current["0"].focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const copyfield = [...otpField];
    copyfield[index] = value.slice(-1);
    setotpField(copyfield);

    if (value && index < otpField.length - 1) {
      ref.current[index + 1].focus();
    }
  };

  return (
    <div className="main">
      <h1
        style={{ textAlign: "center" }}
      >{`Enter otp sent to ${phoneNumber}`}</h1>
      {otpField.map((value, index) => (
        <input
          className="otp-field"
          key={index}
          ref={(c) => (ref.current[index] = c)}
          type="text"
          value={value}
          onKeyDown={(e) => handleKey(e, index)}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default Otp;
