import React, { useState, useCallback } from "react";
import { TodoItem } from "./TodoItem";
export const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isChecked, setIsChecked] = useState({});

  // Handle adding new task
  const handleAdd = useCallback(() => {
    if (value.trim()) {
      setTodo((prev) => [...prev, { task: value, completed: false }]);
      setValue("");
    }
  }, [value]);

  // Handle saving an edited task
  const handleSaveEdit = useCallback(() => {
    if (editingIndex !== null && value.trim()) {
      const updatedTodo = [...todo];
      updatedTodo[editingIndex] = {
        task: value,
        completed: isChecked[editingIndex],
      };
      setTodo(updatedTodo);
      setValue("");
      setEditingIndex(null);
    }
  }, [editingIndex, value, isChecked, todo]);

  // Toggle task completion (checked state)
  const handleChecked = useCallback((id) => {
    setIsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Handle deleting a task
  const handleDelete = useCallback(
    (id) => {
      const filteredTodo = todo.filter((_, i) => id !== i);
      setTodo(filteredTodo);
    },
    [todo]
  );

  // Handle editing a task
  const handleEdit = useCallback(
    (id) => {
      setValue(todo[id].task);
      setEditingIndex(id);
    },
    [todo]
  );

  // Handle keydown for adding/editing task
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (editingIndex === null) {
          handleAdd();
        } else {
          handleSaveEdit();
        }
      }
    },
    [editingIndex, handleAdd, handleSaveEdit]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={value}
          placeholder="Enter your new task..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Add new task"
        />
        <button onClick={editingIndex === null ? handleAdd : handleSaveEdit}>
          {editingIndex === null ? "Add" : "Save"}
        </button>
      </div>

      <div className="todo_list">
        {todo.map((item, index) => (
          <TodoItem
            key={index}
            item={item.task}
            index={index}
            onChecked={handleChecked}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isChecked={isChecked}
          />
        ))}
      </div>
    </div>
  );
};
