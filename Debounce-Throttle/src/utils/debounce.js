// Debounce: run fn only after user stops triggering for "delay" ms.
// Example: search input, resize, autocomplete.
export function debounce(fn, delay = 300) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
