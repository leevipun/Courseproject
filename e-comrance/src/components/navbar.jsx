import {
  FaUser,
  FaShoppingBasket,
  FaHeart,
  FaQuestionCircle,
  FaHome,
  FaAddressCard,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import "../App.css";
import React from "react";

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);
  const handleClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  return (
    <div>
      <nav>
        <ul id="navbar">
          <li id="navitem">
            <Link to="/">
              Home <FaHome />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/about">
              About-us <FaQuestionCircle />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/contacts">
              Contacts <FaAddressCard />
            </Link>
          </li>
          {showInput && <input id="searchInput" placeholder="Search" />}
          <li id="search" onClick={() => handleClick()}>
            <FaMagnifyingGlass />
          </li>
          <li id="navitem">
            <Link to="/add">
              <FaPlus />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/cart">
              <FaShoppingBasket />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/favorites">
              <FaHeart />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/user">
              <FaUser />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
