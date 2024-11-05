import React, { useState, useEffect, useRef } from "react";
import data from "../data.json";

const Carousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const totalImages = data.length;

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrevious = () => {
    setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 2000); // 2 seconds interval

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const onMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const onMouseLeave = () => {
    intervalRef.current = setInterval(handleNext, 1000);
  };

  // Keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  return (
    <div
      className="carousel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => handleKeyDown(e)}
      role="region" // Accessible region for the carousel
      aria-label="Image Carousel" // Accessible label
    >
      <button
        className="prev"
        onClick={handlePrevious}
        aria-label="Previous Image" // Accessible label for button
      >
        ◀️
      </button>
      <img
        src={data[imageIndex].download_url}
        alt={data[imageIndex].author ? data[imageIndex].author : "Image"}
        key={data[imageIndex].id}
        className="single_image"
      />
      <button
        className="next"
        onClick={handleNext}
        aria-label="Next Image" // Accessible label for button
      >
        ▶️
      </button>
    </div>
  );
};

export default Carousel;
