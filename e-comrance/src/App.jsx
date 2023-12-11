import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services, {
  getAllFavoriteItems,
  getUserData,
} from "./services/Services.js";
import { useEffect } from "react";

import "./App.css";

import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Cartpage from "./pages/Cartpage";
import Registerypage from "./pages/Reqisterypage";
import Favoritepage from "./pages/Favorites";
import Userpage from "./pages/Userpage";
import Notfound from "./pages/Notfound";
import Contactpage from "./pages/Contactpage";
import AddingPage from "./pages/Addingpage";
import { useDispatch } from "react-redux";
import { appendUser, clearUser } from "../reducer/userReducer.js";
import PurchaseHistory from "./pages/Purchasepage.jsx";
import Notification from "./components/notification.jsx";
import { initializecart } from "../reducer/cartReducer.js";
import { initializeListing } from "../reducer/listingReducer.js";
import { initializefavorite } from "../reducer/favoriteReducer.js";
import Ownlisting from "./pages/Ownlistingpage.jsx";
import Checkoutpage from "./pages/Checkoutpage.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const sessionUser = window.sessionStorage.getItem("loggedNoteappUser");

      if (sessionUser) {
        const user = JSON.parse(sessionUser);
        console.log(user);
        Services.setToken(`${user}`);
        const response = await getUserData();
        dispatch(clearUser());
        console.log(response); // Get user data from backend and set it to redux store
        dispatch(appendUser(response));
        console.log("Token added");
      } else {
        window.sessionStorage.clear(); // Clear sessionStorage if no user is logged in
        console.log("sessionStorage cleared");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await Services.getAllCartItems();
        dispatch(initializecart(listings));
        console.log("Listings", listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await Services.getAllListings();
        dispatch(initializeListing(listings));
        console.log("Listings", listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllFavoriteItems();
      dispatch(initializefavorite(response));
    };
    fetchData();
  });

  return (
    <div>
      <Notification />
      <Router>
        <Routes>
          <Route path="/" exact Component={Homepage} />
          <Route path="/about" Component={Aboutpage} />
          <Route path="/cart" Component={Cartpage} />
          <Route path="/checkout" Component={Checkoutpage} />
          <Route path="/login" Component={Loginpage} />
          <Route path="/register" Component={Registerypage} />
          <Route path="/favorites" Component={Favoritepage} />
          <Route path="/user" Component={Userpage} />
          <Route path="/contacts" Component={Contactpage} />
          <Route path="/add" Component={AddingPage} />
          <Route path="/history" Component={PurchaseHistory} />
          <Route path="/ownlisting" Component={Ownlisting} />
          <Route path="/payment-successful" Component={PurchaseHistory} />
          <Route path="/*" Component={Notfound} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
