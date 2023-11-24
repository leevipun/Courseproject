import {
  FaShoppingBasket,
  FaHeart,
  FaQuestionCircle,
  FaHome,
  FaAddressCard,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import "../App.css";
import React from "react";
import { Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  TransactionOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const handleClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    console.log("Hah localstorage meni siinä");
    navigate("/login");
  };

  const items = [
    {
      label: "User info",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Purchase history",
      key: "2",
      icon: <TransactionOutlined />,
    },
    {
      label: "Log out",
      key: "3",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

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
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <FaUser id="user" />
                </Space>
              </a>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
