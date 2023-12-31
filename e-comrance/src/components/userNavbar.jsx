import React from "react";

const UserNavbar = ({
  handleShowAdditionalInfo,
  handleShowAddressInfo,
  handleShowPersonalInfo,
}) => {
  return (
    <div id="userPageDiv">
      <div>
        <ul id="usernavbar">
          <li id="usernavitem" onClick={handleShowPersonalInfo}>
            Personal Info
          </li>
          <li id="usernavitem" onClick={handleShowAddressInfo}>
            Address Info
          </li>
          <li id="usernavitem" onClick={handleShowAdditionalInfo}>
            Additional Info
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavbar;
