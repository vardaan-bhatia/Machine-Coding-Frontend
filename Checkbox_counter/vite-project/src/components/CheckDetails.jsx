import React from "react";

export const CheckDetails = ({ Count, SelectedNames }) => {
  return (
    <div>
      <div>Count : {Count}</div>
      <div>
        Name : {SelectedNames.length ? SelectedNames.join(",") : "None"}
      </div>
    </div>
  );
};
