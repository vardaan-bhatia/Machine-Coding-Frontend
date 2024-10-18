import React from "react";
import ProgressBar from "./ProgressBar";

const App = () => {
  return (
    <div className="App">
      <h1>Progress Bar</h1>
      {/*Progress bar component*/}
      <ProgressBar PercentageValue={59} min={0} max={100} />
    </div>
  );
};
export default App;
