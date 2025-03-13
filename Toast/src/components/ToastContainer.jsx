import React, { useRef, useState } from "react";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const timeRef = useRef({});

  const handleDisappear = (ID) => {
    if (timeRef.current[ID]) {
      clearTimeout(timeRef.current[ID]);
      delete timeRef.current[ID];
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== ID));
  };

  const handleShow = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [{ id, message, type }, ...prev]);

    timeRef.current[id] = setTimeout(() => handleDisappear(id), 5000);
  };

  return (
    <>
      <div className="toast-container">
        {toasts &&
          toasts.map(({ id, message, type }) => (
            <div className={`toast ${type}`} key={id}>
              {message} <span onClick={() => handleDisappear(id)}>x</span>
            </div>
          ))}
      </div>
      <div className="container">
        <div className="btn-container">
          <button onClick={() => handleShow("Success", "success")}>
            Success Toast
          </button>
          <button onClick={() => handleShow("Info", "info")}>Info toast</button>
          <button onClick={() => handleShow("Warning", "warning")}>
            Warning toast
          </button>
          <button onClick={() => handleShow("Error", "error")}>
            Error toast
          </button>
        </div>
      </div>
    </>
  );
};

export default ToastContainer;
