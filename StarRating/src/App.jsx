import { useState } from "react";
import StarRating from "./StarRating";

function App() {
  const [rating, setrating] = useState(0);
  const [hoverRating, sethoverRating] = useState(0);

  const handleChange = (newrating) => {
    setrating(newrating);
  };
  const hoverChange = (i) => {
    sethoverRating(i);
  };
  return (
    <>
      <h1>Star Rating Machine Coding</h1>
      <StarRating
        rating={rating}
        onChange={handleChange}
        onHoverChange={hoverChange}
      />
      <h2>{`The rating is ${hoverRating || rating}`}</h2>
    </>
  );
}

export default App;
