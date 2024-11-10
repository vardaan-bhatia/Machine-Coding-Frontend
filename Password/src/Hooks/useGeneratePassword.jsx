import { useState, useCallback } from "react";

// Custom hook for generating a password
export const useGeneratePassword = (
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) => {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("Easy");

  // Function to generate a random password based on the settings
  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUppercase) charset += upperChars;
    if (includeLowercase) charset += lowerChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomChar = charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
      generatedPassword += randomChar;
    }

    // Determine strength based on length
    const passwordStrength =
      length >= 15 ? "Strong" : length >= 8 ? "Medium" : "Easy";
    setPassword(generatedPassword);
    setStrength(passwordStrength);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  // Function to trigger password generation
  const handlePasswordGenerate = () => {
    generatePassword();
  };

  return { password, strength, handlePasswordGenerate };
};
