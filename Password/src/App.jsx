import React, { useState } from "react";
import { useGeneratePassword } from "./Hooks/useGeneratePassword";
import { Button } from "./components/Button";
const App = () => {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const { password, strength, handlePasswordGenerate } = useGeneratePassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="Password_box">
      <div className="main_app">
        {/* Display the generated password */}
        <div className="copy_password">
          <h1>{password}</h1>
          <Button label={"Copy"} onClick={handleCopy} />
        </div>

        {/* Input length */}
        <div className="input_range">
          <div className="character_length">
            <h2>Character Length</h2>
            <p>{length}</p>
          </div>
          <input
            type="range"
            value={length}
            min={5}
            max={20}
            onChange={(e) => setLength(Number(e.target.value))} // Convert string to number
          />
        </div>

        {/* Checkbox categories */}
        <div className="checkboxes">
          <div>
            <input
              type="checkbox"
              id="uppercase"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <label htmlFor="uppercase">Include Uppercase</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <label htmlFor="lowercase">Include Lowercase</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>

        {/* Password strength */}
        <div className="password_strength">
          <h3>Password Strength</h3>
          <p>{strength}</p>
        </div>

        {/* Generate button */}
        <div className="Generate_Button">
          <Button
            label={"Generate Password"}
            onClick={handlePasswordGenerate}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
