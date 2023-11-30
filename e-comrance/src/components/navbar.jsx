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
import { useEffect, useState } from "react";
import "../App.css";
import React from "react";
import { Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setfilter } from "../../reducer/filterReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showInput, setShowInput] = useState(false);
  const [showAdd, setShowAdd] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [filter, setFilter] = useState('')

  const filter = useSelector((state) => state.filter);

  const filterChange = (filter) => {
    dispatch(setfilter(filter))
    setFilter(filter)
  }

  useEffect(() => {
    const fetchData = () => {
      const loggerUser = window.localStorage.getItem("loggedNoteappUser");

      if (loggerUser) {
        const user = JSON.parse(loggerUser);
        const userStatus = user.style
        if(userStatus === "seller" || userStatus === "both") {
          setShowAdd(true)
        }
        if(userStatus !== 'seller') {
          setShowCart(true)
        }
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const cart = useSelector((state) => {
    return state.cart;
  });

  const numberOfItemsInCart = cart.length;

  const handleLogout = () => {
    window.localStorage.clear();
    console.log("Hah localstorage meni siinä");
    navigate("/login");
  };

  const handlePurchaseHistory = () => {
    navigate("/history");
  };

  const handleUserInfo = () => {
    navigate("/user");
  };

  const items = [
    {
      label: "User info",
      key: "1",
      icon: <UserOutlined />,
      onClick: handleUserInfo,
    },
    {
      label: "Purchase history",
      key: "2",
      icon: <TransactionOutlined />,
      onClick: handlePurchaseHistory,
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
          {showInput && <input id="searchInput" value={filter} onChange={(e) => filterChange(e.target.value)} placeholder="Search" />}
          <li id="search" onClick={() => handleClick()}>
            <FaMagnifyingGlass />
          </li>
          {showAdd && (          <li id="navitem">
            <Link to="/add">
              <FaPlus />
            </Link>
          </li>)}
          {showCart && (          <li id="navitem">
            <Link to="/cart">
              <FaShoppingBasket /> {numberOfItemsInCart}
            </Link>
          </li>)}

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
