import React, { useState } from "react";
import { useThrottle } from "./Hooks/useThrottle";

const App = () => {
  const [data, setdata] = useState("");
  const throttledValue = useThrottle(data, 300);

  const handleChange = (e) => {
    setdata(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        className="text"
        value={data}
        onChange={handleChange}
      />
      <h1>{throttledValue}</h1>
    </div>
  );
};

export default App;
