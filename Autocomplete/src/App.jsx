import React, { useRef, useState, useEffect } from "react";
import useFetch from "./Hooks/useFetch";
import useDebounce from "./Hooks/useDebounce";

const App = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 200);
  const url = debounceValue
    ? `https://dummyjson.com/products/search?q=${debounceValue}`
    : null;
  const { data, loading, error } = useFetch(url);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Typeahead/Autosuggestion</h1>
        <div>
          <input
            ref={ref}
            type="text"
            name="text"
            id="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input"
            placeholder="Search for items..."
          />
          <div className="list">
            {loading && <p>Loading....</p>}
            {error && <p>Error while fetching data</p>}
            {data && data.products && data.products.length > 0 ? (
              <ul className="list">
                {data.products.slice(0, 10).map((item) => (
                  <li key={item.id}>
                    <h3 className="item">{item.title}</h3>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
