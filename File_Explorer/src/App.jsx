import React from "react";
import { Structure } from "./components/Structure";
import data from "./folderData.json";

const App = () => {
  return (
    <div>
      {data.map((item) => (
        <Structure key={item.id} item={item} />
      ))}
    </div>
  );
};

export default App;
