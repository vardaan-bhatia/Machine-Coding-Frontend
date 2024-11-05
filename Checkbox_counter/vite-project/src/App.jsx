import React, { useState } from "react";
import { InputCheck } from "./components/InputCheck";
import { Button } from "./components/SubmitButton";
import { CheckDetails } from "./components/CheckDetails";

const App = () => {
  const [checkedData, setCheckedData] = useState([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
    { id: 4, label: "Checkbox 4", checked: false },
  ]);

  const handleChange = (id) => {
    setCheckedData((prev) =>
      prev.map((check) =>
        check.id === id ? { ...check, checked: !check.checked } : check
      )
    );
  };

  const handleSelectAll = () => {
    setCheckedData((prev) => prev.map((data) => ({ ...data, checked: true })));
  };

  const handleReset = () => {
    setCheckedData((prev) => prev.map((data) => ({ ...data, checked: false })));
  };
  const selectedCheckboxes = checkedData.filter((checked) => checked.checked);
  const allSelected = selectedCheckboxes.length === checkedData.length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2>Select Options</h2>
        {checkedData.map((checked) => (
          <InputCheck
            key={checked.id}
            label={checked.label}
            id={checked.id}
            checked={checked.checked}
            onChange={() => handleChange(checked.id)}
          />
        ))}
        <Button
          value="Submit All"
          onClick={() => handleSelectAll()}
          disabled={allSelected}
        />
        <Button value="Reset" onClick={() => handleReset()} />
        <CheckDetails
          Count={selectedCheckboxes.length}
          SelectedNames={selectedCheckboxes.map((selected) => selected.label)}
        />
      </div>
    </div>
  );
};

export default App;
