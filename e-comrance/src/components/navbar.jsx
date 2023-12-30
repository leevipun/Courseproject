import {
  FaShoppingBasket,
  FaHeart,
  FaQuestionCircle,
  FaHome,
  FaAddressCard,
  FaPlus,
  FaUser,
  FaList,
  FaUserFriends,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaPeopleGroup } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Dropdown, Space, Input } from "antd";
import { CiLogin } from "react-icons/ci";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../../reducer/filterReducer";
import { clearUser, setUser } from "../../reducer/userReducer";
import { clearCart } from "../../reducer/cartReducer";
import { clearFavorite } from "../../reducer/favoriteReducer";
import { clearListing } from "../../reducer/listingReducer";
import { getUserData } from "../services/Services";
import { addNotification } from "../../reducer/notificationReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggerUser = window.sessionStorage.getItem("loggedNoteappUser");

        if (loggerUser) {
          const user = JSON.parse(loggerUser);

          const userStatus = user.style;
          if (userStatus === "seller" || userStatus === "both") {
            setShowAdd(true);
          }
          if (userStatus !== "seller") {
            setShowCart(true);
          }
          if (user.length > 0) {
            setIsLogged(true);
          }
        }
        const response = await getUserData(loggerUser);
        setUser(response);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(addNotification("Please login, your session has expired"));
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const content = event.target.value;
    dispatch(filterChange(content));
  };

  const handleClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const cart = useSelector((state) => {
    return state.cart;
  });

  const favorite = useSelector((state) => {
    return state.favorite;
  });

  const numberOfItemsInCart = cart.length;

  const numberOfItemsInFavorite = favorite.length;

  const handleLogout = () => {
    window.sessionStorage.clear();
    console.log("Hah sessionStorage meni siinä");
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearFavorite());
    dispatch(clearListing());
    console.log("User cleared");
    navigate("/login");
  };

  const handleUserInfo = () => {
    navigate("/user");
  };

  const handleOwnlisting = () => {
    navigate("/ownlisting");
  };

  const handleFriends = () => {
    navigate("/friends");
  };

  const handleChats = () => {
    navigate("/chats");
  };

  const items = [
    {
      label: "User info",
      key: "1",
      icon: <UserOutlined />,
      onClick: handleUserInfo,
    },
    {
      label: "Own listings",
      key: "2",
      icon: <FaList />,
      onClick: handleOwnlisting,
    },
    {
      label: "Friends",
      key: "3",
      icon: <FaUserFriends />,
      onClick: handleFriends,
    },
    {
      label: "Chats",
      key: "4",
      icon: <FaPeopleGroup />,
      onClick: handleChats,
    },
    {
      label: "Log out",
      key: "4",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <nav>
        <ul id="navbar">
          <li id="navitem">
            <Link to="/">Nordic Exchange</Link>
          </li>
          <li id="navitem">
            <Link to="/">
              Home <FaHome />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/authors">
              Authors <FaUser />
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
          {showInput && (
            <Input
              placeholder="input search text"
              onChange={handleChange}
              style={{ width: 250 }}
              id="NavsearchInput"
              enterButton
            />
          )}
          <li id="search" onClick={() => handleClick()}>
            <FaMagnifyingGlass />
          </li>
          {showAdd && (
            <li id="navitem">
              <Link to="/add">
                <FaPlus />
              </Link>
            </li>
          )}
          {showCart && (
            <li id="navitem">
              <Link to="/cart">
                <FaShoppingBasket /> {numberOfItemsInCart}
              </Link>
            </li>
          )}

          <li id="navitem">
            <Link to="/favorites">
              <FaHeart /> {numberOfItemsInFavorite}
            </Link>
          </li>
          {isLogged && (
            <li id="navitem">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <FaUser id="user" />
                  </Space>
                </a>
              </Dropdown>
            </li>
          )}
          {!isLogged && (
            <li id="navitem">
              <Link to="/login">
                Login <CiLogin />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
