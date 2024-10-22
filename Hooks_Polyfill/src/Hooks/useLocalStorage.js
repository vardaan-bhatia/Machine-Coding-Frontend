import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Retrieve the value from localStorage or use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving localStorage key:", error);
      return initialValue;
    }
  });

  // Update both the state and the localStorage
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
