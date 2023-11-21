import {
  FaUser,
  FaShoppingBasket,
  FaHeart,
  FaQuestionCircle,
  FaHome,
  FaAddressCard,
} from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Homepage from "../pages/Homepage";
import Userpage from "../pages/Userpage";
import Favoritepage from "../pages/Favorites";
import Cartpage from "../pages/Cartpage";
import Contactpage from "../pages/Contactpage";
import Aboutpage from "../pages/Aboutpage";
import { useState } from "react";

const Home = () => <Homepage />;
const About = () => <Aboutpage />;
const Contacts = () => <Contactpage />;
const ShoppingCart = () => <Cartpage />;
const Favorites = () => <Favoritepage />;
const UserProfile = () => <Userpage />;

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);
  const handleClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  return (
    <BrowserRouter>
      <nav>
        <ul id="navbar">
          <li id="navitem">
            <Link to="/">
              <FaHome />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/about-us">
              <FaQuestionCircle />
            </Link>
          </li>
          <li id="navitem">
            <Link to="/contacts">
              <FaAddressCard />
            </Link>
          </li>
          {showInput && <input id="searchInput" placeholder="Search" />}
          <li id="search" onClick={() => handleClick()}>
            <FaMagnifyingGlass />
          </li>
          <li id="navitem">
            <Link to="/shopping-cart">
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
