import React from 'react';

const Sidebar = (props) => {
  const { isOpen } = props;

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
