import { useRef, useState, useCallback, useEffect } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  const handleClose = useCallback((id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const handleAdd = useCallback(
    (message, type) => {
      const id = Date.now();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
      timersRef.current[id] = setTimeout(() => handleClose(id), 5000);
    },
    [handleClose]
  );

  const toastClass = (type) =>
    `toast ${type} p-2 mb-2 flex justify-between items-center rounded shadow`;

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => (
          <div key={id} className={toastClass(type)}>
            <span>{message}</span>
            <button
              className="close-btn text-red-500 ml-2"
              onClick={() => handleClose(id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="btn-container flex gap-2 mt-4">
        {["Success", "Info", "Warning", "Error"].map((type) => (
          <button
            key={type}
            onClick={() => handleAdd(`${type} Toast`, type.toLowerCase())}
            className={`btn-${type.toLowerCase()} px-4 py-2 rounded bg-${type.toLowerCase()}-500 text-white`}
          >
            {type} Toast
          </button>
        ))}
      </div>
    </div>
  );
}
