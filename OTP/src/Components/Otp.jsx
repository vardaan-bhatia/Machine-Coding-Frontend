import React, { useRef, useState, useEffect } from "react";
import "../index.css";

const Otp = ({ Length = 6 }) => {
  const [otpField, setOtpField] = useState(new Array(Length).fill(""));
  const ref = useRef([]);

  useEffect(() => {
    if (ref.current[0]) {
      ref.current[0].focus();
    }
  }, []);

  const handleKey = (e, index) => {
    if (e.key === "Backspace") {
      setOtpField((prev) => {
        const updatedOtp = [...prev];
        updatedOtp[index] = "";
        return updatedOtp;
      });

      if (index > 0) ref.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      ref.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < otpField.length - 1) {
      ref.current[index + 1]?.focus();
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits allowed
    if (!value) return;

    setOtpField((prev) => {
      const updatedOtp = [...prev];
      updatedOtp[index] = value.slice(-1); // Ensure only one character
      return updatedOtp;
    });

    if (index < otpField.length - 1) {
      ref.current[index + 1]?.focus();
    }
  };

  return (
    <div className="main">
      <h1 style={{ textAlign: "center" }}>{`Enter OTP `}</h1>
      <div className="otp-container">
        {otpField.map((value, index) => (
          <input
            className="otp-field"
            key={index}
            ref={(el) => (ref.current[index] = el)}
            type="text"
            value={value}
            onKeyDown={(e) => handleKey(e, index)}
            onChange={(e) => handleChange(e, index)}
            maxLength="1"
            inputMode="numeric"
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
