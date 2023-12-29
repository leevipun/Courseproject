import "../styles/usernavbarStyles.css";
import React from "react";

const UserNavbar = () => {
  return (
    <div className="App">
      <nav>
        <ul>
          <li className="nav-item">Info</li>
          <li className="nav-item">Purchase history</li>
          <li className="nav-item">Orders</li>
          <li className="nav-item">Log out</li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavbar;
