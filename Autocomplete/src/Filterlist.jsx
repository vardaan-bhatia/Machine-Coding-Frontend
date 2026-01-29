import React, { useEffect, useMemo, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export default function CountryList() {
  const [data, setData] = useState([]); // full data
  const [query, setQuery] = useState(""); // input value
  const debouncedQuery = useDebounce(query, 500);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ 1) Fetch and show complete list initially
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ✅ 2) Filter only after debounce
  const filteredList = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    // ✅ show complete list if search is empty
    if (!q) return data;

    return data.filter((item) => item.name.toLowerCase().includes(q));
  }, [data, debouncedQuery]);

  return (
    <div style={{ padding: 20 }}>
      <h2>List + Debounced Search</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ padding: 10, width: 260 }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {filteredList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
