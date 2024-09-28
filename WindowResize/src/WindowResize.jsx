import React, { useState, useEffect } from "react";

const WindowResize = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [message, setMessage] = useState("");

  const handleResize = () => {
    const { innerWidth, innerHeight } = window;

    setWindowDimensions({ width: innerWidth, height: innerHeight });

    if (innerWidth < 600) {
      setBackgroundColor("#ffcccc");
      setMessage("Small screen detected!");
    } else if (innerWidth < 1200) {
      setBackgroundColor("#ccffcc");
      setMessage("Medium screen detected!");
    } else {
      setBackgroundColor("#ccccff");
      setMessage("Large screen detected!");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor }}>
      <h1>Window Dimensions</h1>
      <p>Width: {windowDimensions.width}px</p>
      <p>Height: {windowDimensions.height}px</p>
      <h2>{message}</h2>
    </div>
  );
};

export default WindowResize;
