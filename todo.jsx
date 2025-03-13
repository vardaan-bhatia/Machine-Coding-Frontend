import { useState } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), title: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo App</h1>
      <div className="todo-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
          placeholder="Add a new task..."
        />
        <button onClick={addTask} className="todo-add-btn">
          Add
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <div className="todo-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="todo-checkbox"
              />
              <span
                className={task.completed ? "todo-text completed" : "todo-text"}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="todo-delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
.todo {
    width: 300px;
    margin: auto;
    font-family: sans-serif;
  }
  
  .input-group {
    display: flex;
    gap: 5px;
  }
  
  input,
  button {
    padding: 5px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  
  .done span {
    text-decoration: line-through;
    color: gray;
  }
  