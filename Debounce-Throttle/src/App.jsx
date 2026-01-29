import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "./utils/debounce";
import { throttle } from "./utils/throttle";

export default function App() {
  // ---------------- Debounce demo (typing) ----------------
  const [typed, setTyped] = useState(""); // updates on every keypress
  const [debouncedValue, setDebouncedValue] = useState(""); // updates after delay

  // Create ONE debounced function (so timer is preserved).
  const debouncedSet = useMemo(() => debounce(setDebouncedValue, 500), []);

  // ---------------- Throttle demo (mousemove) ----------------
  const [moves, setMoves] = useState(0); // increments slowly (throttled)

  useEffect(() => {
    // This function will be called at most once per 200ms
    const onMove = throttle(() => setMoves((c) => c + 1), 200);

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="wrap">
      <h2>Debounce & Throttle (basic)</h2>

      <div className="box">
        <h3>Debounce example (search typing)</h3>

        {/* On every keypress: update typed + call debounced setter */}
        <input
          value={typed}
          placeholder="Type here..."
          onChange={(e) => {
            const v = e.target.value;
            setTyped(v); // instant
            debouncedSet(v); // after 500ms pause
          }}
        />

        <p>Typed (instant): {typed}</p>
        <p>Debounced (after 500ms): {debouncedValue}</p>
      </div>

      <div className="box">
        <h3>Throttle example (mousemove)</h3>
        <p>Move your mouse. Counter updates at most once per 200ms.</p>
        <p>Throttled updates: {moves}</p>
      </div>
    </div>
  );
}
