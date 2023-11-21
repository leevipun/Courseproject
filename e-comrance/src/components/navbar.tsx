import { FaUser, FaShoppingBasket, FaHeart } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Userpage from "../pages/Userpage";
import Favoritepage from "../pages/Favorites";
import Cartpage from "../pages/Cartpage";
import Contactpage from "../pages/Contactpage";
import Aboutpage from "../pages/Aboutpage";

const Home = () => <Homepage />;
const About = () => <Aboutpage />;
const Contacts = () => <Contactpage />;
const ShoppingCart = () => <Cartpage />;
const Favorites = () => <Favoritepage />;
const UserProfile = () => <Userpage />;

const Navbar = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul id="navbar">
          <li id="navitem">
            <Link to="/">Home</Link>
          </li>
          <li id="navitem">
            <Link to="/about-us">About</Link>
          </li>
          <li id="navitem">
            <Link to="/contacts">Contacts</Link>
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
