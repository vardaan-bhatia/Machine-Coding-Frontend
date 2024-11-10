import React, { useState } from "react";

export const Structure = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [addItem, setAddItem] = useState([]);
  const [value, setValue] = useState("");

  const toggleFolder = () => {
    if (item.isFolder) {
      setIsOpen(!isOpen);
    }
  };

  const buttonClick = (event, isFolder) => {
    event.stopPropagation();
    setIsOpen(true);
    setInput({ visible: true, isFolder });
  };

  const handleAdd = (e) => {
    if (e.key === "Enter" && value.trim()) {
      const newItem = {
        id: Date.now(),
        name: value,
        isFolder: input.isFolder,
        items: [],
      };
      setAddItem((prev) => [...prev, newItem]);
      setValue("");
      setInput({ visible: false, isFolder: null });
    }
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div
        style={{
          cursor: item.isFolder ? "pointer" : "default",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "400px",
        }}
      >
        <div style={{ display: "flex", gap: "50px" }} onClick={toggleFolder}>
          <span>
            <span>{item.isFolder ? (isOpen ? "📂" : "📁") : "📄"}</span>
            <span>{item.name}</span>
          </span>

          {item.isFolder && (
            <span style={{ display: "flex", gap: "10px" }}>
              <button onClick={(e) => buttonClick(e, true)}>+📁</button>
              <button onClick={(e) => buttonClick(e, false)}>+📄</button>
            </span>
          )}
        </div>
      </div>

      <div>
        {input.visible && (
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            <span>{input.isFolder ? "📁" : "📄"}</span>
            <span>
              <input
                value={value}
                onKeyDown={(e) => handleAdd(e)}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                autoFocus
                onBlur={(prev) => setInput({ ...prev, visible: false })}
              />
            </span>
          </div>
        )}

        {addItem.map((i) => (
          <div style={{ marginTop: "10px" }}>
            <Structure item={i} key={i.id} />
          </div>
        ))}

        {isOpen && item.isFolder && item.items.length > 0 && (
          <div>
            {item.items.map((nesteditem) => (
              <Structure item={nesteditem} key={nesteditem.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
