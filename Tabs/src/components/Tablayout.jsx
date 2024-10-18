import React, { useRef, useEffect } from "react";
import { useState } from "react";

const tabsData = [
  { id: 1, label: "Tab 1", content: "This is the content of Tab 1." },
  { id: 2, label: "Tab 2", content: "This is the content of Tab 2." },
  { id: 3, label: "Tab 3", content: "This is the content of Tab 3." },
];

const Tablayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]); // To store the refs of each tab button

  // Handle right/left arrow key navigation
  const handleKeyNavigation = (e) => {
    if (e.key === "ArrowRight" && activeTab < tabsData.length - 1) {
      setActiveTab((prevTab) => prevTab + 1); // Cycle to the next tab
    } else if (e.key === "ArrowLeft" && activeTab > 0) {
      setActiveTab((prevTab) => prevTab - 1); // Cycle to the previous tab
    }
  };

  // Focus the active tab button whenever it changes
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].focus();
    }
  }, [activeTab]);

  return (
    <div>
      <div className="tab-list" onKeyDown={handleKeyNavigation} tabIndex={0}>
        {tabsData.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)} // Assign ref for each tab button
            onClick={() => setActiveTab(index)}
            className={`tabs-button ${activeTab === index ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="content">{tabsData[activeTab].content}</div>
    </div>
  );
};

export default Tablayout;
