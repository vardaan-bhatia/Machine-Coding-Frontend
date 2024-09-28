// src/components/WindowResizeComponent.jsx
import React, { useState, useEffect } from "react";

const WindowResize = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default white background
  const [message, setMessage] = useState("");

  // Function to handle window resize
  const handleResize = () => {
    const { innerWidth, innerHeight } = window;

    setWindowDimensions({ width: innerWidth, height: innerHeight });

    // Change background color based on width
    if (innerWidth < 600) {
      setBackgroundColor("#ffcccc"); // Light red for small screens
      setMessage("Small screen detected!");
    } else if (innerWidth < 1200) {
      setBackgroundColor("#ccffcc"); // Light green for medium screens
      setMessage("Medium screen detected!");
    } else {
      setBackgroundColor("#ccccff"); // Light blue for large screens
      setMessage("Large screen detected!");
    }
  };

  // Using useEffect to add the resize event listener
  useEffect(() => {
    // Add the event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run on mount only

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
