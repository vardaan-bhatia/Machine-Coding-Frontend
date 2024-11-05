import React, { useEffect, useState } from "react";

export const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleAdd = () => {
    if (value.trim()) {
      setTodo((prev) => [value, ...prev]);
      setValue("");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editingIndex === null) {
        handleAdd(); // Add task if not editing
      } else {
        handleSaveEdit(); // Save edited task if editing
      }
    }
  };

  const handleDelete = (id) => {
    const filteredTodo = todo.filter((_, i) => id !== i);
    setTodo(filteredTodo);
  };

  const handleEdit = (id) => {
    setValue(todo[id]);
    setEditingIndex(id); // Set the index of the item being edited
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && value.trim()) {
      const updatedTodo = [...todo];
      updatedTodo[editingIndex] = value; // Update the task
      setTodo(updatedTodo);
      setValue(""); // Clear input
      setEditingIndex(null); // Reset editing state
    }
  };

  const handleChcked = (id) => {
    setIsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          className="text"
          onKeyDown={onKeyDown}
          value={value}
          placeholder="Enter your new task..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={editingIndex === null ? handleAdd : handleSaveEdit}>
          {editingIndex === null ? "Add" : "Save"} {/* Button text changes */}
        </button>
      </div>
      <div className="todo_list">
        {todo &&
          todo.map((item, index) => (
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              key={index}
            >
              <input type="checkbox" onClick={() => handleChcked(index)} />
              <span
                style={{
                  textDecoration: isChecked ? "line-through" : "none",
                  color: isChecked ? "gray" : "black", // Change color if checked
                  fontWeight: isChecked ? "normal" : "bold", // Change font weight if checked
                }}
              >
                {item}
              </span>
              <span style={{ cursor: "pointer" }}>
                <span onClick={() => handleDelete(index)}>🗑️</span>
                <span onClick={() => handleEdit(index)}>✏️</span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
