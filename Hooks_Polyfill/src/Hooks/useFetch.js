import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true); // Indicates loading state
  const [data, setData] = useState(null); // Stores fetched data
  const [error, setError] = useState(null); // Stores any fetch errors

  useEffect(() => {
    const controller = new AbortController(); // To abort fetch if needed
    const signal = controller.signal;

    const fetchUrl = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset previous errors

      if (!url) return; // Exit if URL is not provided

      try {
        const response = await fetch(url, { signal }); // Fetch data from the URL
        if (!response.ok) {
          throw new Error(response.statusText || "Error fetching data"); // Handle HTTP errors
        }
        const result = await response.json(); // Parse the JSON response
        setData(result); // Update data state
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted"); // Log if fetch was aborted
        } else {
          setError(error.message); // Set error state for other errors
        }
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUrl(); // Trigger the fetch

    return () => {
      controller.abort(); // Clean up by aborting fetch on unmount or URL change
    };
  }, [url]); // Rerun effect when the URL changes

  return { data, error, loading }; // Return fetched data, error, and loading state
};
