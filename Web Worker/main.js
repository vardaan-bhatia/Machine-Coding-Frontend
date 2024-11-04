// main.js

let worker;

// Function to start the worker and perform calculation
function startCalculation() {
  // Create a new worker
  worker = new Worker("worker.js");

  // Start the worker by sending a number to count to
  worker.postMessage(10); // Count to 10

  // Receive results from the worker
  worker.onmessage = function (event) {
    console.log("Counting result from worker:", event.data);
    document.getElementById("result").innerText = "Result: " + event.data;
  };

  // Handle any errors that occur in the worker
  worker.onerror = function (error) {
    console.error("Error in worker:", error.message);
  };

  // Change background color while worker is processing
  document.body.style.backgroundColor = "#f0e68c"; // Change to a light yellow
}

// Function to stop the worker
function stopWorker() {
  if (worker) {
    worker.terminate(); // Stop the worker
    worker = null; // Clear the worker reference
    document.body.style.backgroundColor = ""; // Reset background color
    document.getElementById("result").innerText = "Worker stopped.";
  }
}
