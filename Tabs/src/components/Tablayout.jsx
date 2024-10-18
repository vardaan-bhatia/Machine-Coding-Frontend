import React from "react";
import { useState } from "react";
const tabsData = [
  { id: 1, label: "Tab 1", content: "This is the content of Tab 1." },
  { id: 2, label: "Tab 2", content: "This is the content of Tab 2." },
  { id: 3, label: "Tab 3", content: "This is the content of Tab 3." },
];
const Tablayout = () => {
  const [activeTab, setactiveTab] = useState(0);
  return (
    <div>
      <div className="tab-list">
        {tabsData.map((e, index) => (
          <button
            onClick={() => setactiveTab(index)}
            className={`tabs-button ${activeTab == index ? `active` : ``}`}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="content">{tabsData[activeTab].content}</div>
    </div>
  );
};

export default Tablayout;
