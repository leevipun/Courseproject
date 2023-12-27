import "../styles/usernavbarStyles.css";
import React from "react";

const UserNavbar = () => {
  return (
    <div>
      <nav>
        <ul id="ul">
          <li id="li">Info</li>
          <li id="li">Purchase history</li>
          <li id="li">Orders</li>
          <li id="li">Log out</li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavbar;
