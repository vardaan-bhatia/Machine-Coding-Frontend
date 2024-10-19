import { useEffect, useRef, useState } from "react";

export const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedRef = useRef(Date.now()); // Ref to track the last executed time

  useEffect(() => {
    const handler = setInterval(() => {
      const now = Date.now(); // Get current time on every interval
      // Only update the throttled value if enough time has passed
      if (now - lastExecutedRef.current >= delay) {
        setThrottledValue(value); // Update throttled value
        lastExecutedRef.current = now; // Update the last executed time
      }
    }, delay);

    // Clean up interval on unmount or when value/delay changes
    return () => {
      clearInterval(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return throttledValue; // Return the throttled value
};
