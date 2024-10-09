import React, { useState } from "react";
import Otp from "./Otp"; // Import your Otp component

const PhoneField = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = () => {
    // Validate phone number: must be 10 digits
    if (/^\d{10}$/.test(phoneNumber)) {
      setShowOtp(true); // Show OTP component if phone number is valid
      setError(""); // Clear any previous error messages
    } else {
      setError("Please enter a valid 10-digit phone number."); // Set error message
    }
  };

  return (
    <div className="phone-field-container">
      {!showOtp ? (
        <>
          <h1>Enter your number</h1>
          <input
            className="phone-input"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number on change
            placeholder="Enter your phone number"
            maxLength={10} // Limit input to 10 characters
          />
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Display error message */}
        </>
      ) : (
        <Otp Length={6} phoneNumber={phoneNumber} /> // Show OTP component
      )}
    </div>
  );
};

export default PhoneField;
