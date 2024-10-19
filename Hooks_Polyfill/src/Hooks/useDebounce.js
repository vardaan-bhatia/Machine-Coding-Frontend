/**
 * Custom hook: useDebounce
 *
 * This hook debounces any fast-changing value by introducing a delay. It takes two arguments:
 *
 * @param {any} data - The value to be debounced. Typically an input or state that changes frequently.
 * @param {number} [delay=1000] - The debounce delay in milliseconds. Default is 1000ms (1 second).
 *
 * How it works:
 * - When `data` changes, the hook waits for the specified `delay` before updating `debounceValue`.
 * - If `data` changes again before the `delay` completes, the previous timeout is cleared, and a new one starts.
 * - The result is that `debounceValue` is updated only after `data` has remained unchanged for the duration of `delay`.
 *
 * Returns:
 * - The debounced value (`debounceValue`), which reflects `data` after the specified delay.
 *
 * Usage:
 * - This hook is useful for handling expensive operations like API requests or heavy computations based on user input.
 */
import { useState, useEffect } from "react";

export const useDebounce = (data, delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(""); // State to hold debounced value

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(data); // Set debounced value after delay
    }, delay);

    // Clean up timeout when data or delay changes
    return () => {
      clearTimeout(handler); // Clears the previous timeout to prevent unnecessary updates
    };
  }, [data, delay]); // Effect depends on `data` and `delay`

  return debounceValue; // Return the final debounced value
};

// Debounce the whole fn with arguments

import { useCallback, useEffect, useRef } from "react";

function useDebounceFn(fn, delay) {
  const timerRef = useRef();

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return debouncedFn;
}

// ******** Below is the example use case for the debounce hook ******** //

/**
 * App Component:
 *
 * This is an example usage of the `useDebounce` hook. The user input is debounced, meaning the value will only update
 * after the user has stopped typing for a specified amount of time (in this case, 1 second).
 *
 * Key Points:
 * - The `data` state holds the current value of the input.
 * - `debounceValue` (from the hook) updates 1 second after the user stops typing.
 * - This can be useful for real-time search inputs, API calls, or any functionality that requires rate-limiting.
 */
import React, { useState } from "react";
import { useDebounce } from "./Hooks/useDebounce";

const App = () => {
  const [data, setData] = useState(""); // State to track input value
  const debounceValue = useDebounce(data, 400); // Use debounced version of the input value

  // Handle input change and update `data`
  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="text"
        value={data}
        onChange={handleChange} // Handle user input and debounce it
      />
      {/* Display the debounced value after delay */}
      <h1>{debounceValue}</h1>
    </div>
  );
};

export default App;
