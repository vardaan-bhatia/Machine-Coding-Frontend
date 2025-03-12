import React from "react";
import { useState } from "react";

const StarRating = ({ size = 5, onChange, rating = 2, onHoverChange }) => {
  const [hoverRating, sethoverRating] = useState(0);
  const handleClick = (index) => {
    onChange(index + 1);
  };
  const handleMouseLeave = () => {
    sethoverRating(0);
    onHoverChange(0);
  };
  const handleMouseEnter = (index) => {
    sethoverRating(index + 1);
    onHoverChange(index + 1);
  };
  return (
    <div>
      {Array(size)
        .fill("")
        .map((_, index) => (
          <span
            key={index}
            style={{
              cursor: "pointer",
              color: index < (hoverRating || rating) ? "gold" : "gray",
              fontSize: "48px",
            }}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        ))}
    </div>
  );
};

export default StarRating;

// we can use this way also    className={`star ${index < (hoverRating || rating) ? 'active' : 'inactive'}`}  // Use class names based on rating .star {
//     cursor: pointer;
//     font-size: 48px; /* Adjust star size here */
//     transition: color 0.2s ease-in-out;
//   }

//   .star.active {
//     color: gold;
//   }

//   .star.inactive {
//     color: gray;
//   }
