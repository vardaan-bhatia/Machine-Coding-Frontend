import React from "react";
import data from "../data.json";
import { useState, useEffect } from "react";
import { useRef } from "react";

const Carousel = () => {
  const [image, setimage] = useState(0);
  const intervalref = useRef(null);

  const handleNext = () => {
    setimage((prev) => (prev + 1) % data.length);
  };
  const handlePrevious = () => {
    setimage((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    intervalref.current = setInterval(handleNext, 2500);

    return () => {
      clearInterval(intervalref.current);
    };
  }, []);

  const onMouseEnter = () => {
    clearInterval(intervalref.current);
  };
  const onMouseLeave = () => {
    intervalref.current = setInterval(handleNext, 1000);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="prev" onClick={handlePrevious}>
        ◀️
      </button>
      <img
        src={data[image].download_url}
        alt={data[image].author}
        key={data[image].id}
        className="single_image"
      />
      <button className="next" onClick={handleNext}>
        ▶️
      </button>
    </div>
  );
};

export default Carousel;
