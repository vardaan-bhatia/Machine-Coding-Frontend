// Throttle: run fn at most once per "delay" ms.
// Example: scroll, mousemove, drag, resize.
export function throttle(fn, delay = 200) {
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn(...args);
    }
  };
}
