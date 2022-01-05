import React from "react";

const SideBarItems = ({ name, active, handleClick }) => {
  return (
    <button className={`sidebar-item ${active ? "active" : null} `} onClick={handleClick} >
      {name}
    </button>
  );
};

export default SideBarItems;
