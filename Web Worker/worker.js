// worker.js

// Listen for messages from the main thread
self.onmessage = function (event) {
  const limit = event.data; // Get the limit from the main thread
  let result = "";

  // Perform a counting task
  for (let i = 1; i <= limit; i++) {
    result += i + " "; // Create a string of numbers
  }

  // Send the result back to the main thread
  self.postMessage(result.trim()); // Trim to remove trailing space
};
