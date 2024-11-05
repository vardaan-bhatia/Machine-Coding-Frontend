import React from "react";
import { Todo } from "./components/Todo";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Todo />
    </div>
  );
};

export default App;
