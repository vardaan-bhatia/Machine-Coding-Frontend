import React, { useEffect, useState } from "react";

const WindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [bgColor, setBgColor] = useState("yellow");
  const [text, setText] = useState("large screen");

  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    setWindowSize({ height: newHeight, width: newWidth });

    // Update background color and text based on width
    if (newWidth < 600) {
      setBgColor("blue");
      setText("small screen");
    } else if (newWidth < 1200) {
      setBgColor("green");
      setText("medium screen");
    } else {
      setBgColor("yellow");
      setText("large screen");
    }
  };

  useEffect(() => {
    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: "black",
        fontWeight: "bold",
        padding: "20px",
        textAlign: "center",
        fontSize: "larger",
      }}
    >
      <h1>Window Resize</h1>
      <p>Window Height: {windowSize.height}</p>
      <p>Window Width: {windowSize.width}</p>
      <p>{text}</p>
    </div>
  );
};

export default WindowResize;
