import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (inputValue.trim() === "") return; // Prevent empty input
    setItems([...items, inputValue]);
    setInputValue(""); // Clear input after adding
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-gray-900 text-white rounded-lg">
      {/* Input for Adding Items */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 border rounded-md text-black w-full"
          placeholder="Enter item..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md text-black w-full"
        placeholder="Search..."
      />

      {/* Display Filtered List */}
      <ul className="mt-4 space-y-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className="p-2 bg-gray-800 rounded-md">
              {item}
            </li>
          ))
        ) : (
          <li className="text-gray-400">No items found</li>
        )}
      </ul>
    </div>
  );
}
