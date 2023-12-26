import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services, { getUserData } from "./services/Services.js";
import { useEffect } from "@react";

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
import { useDispatch, useSelector } from "react-redux";
import PurchaseHistory from "./pages/Purchasepage.jsx";
import Notification from "./components/notification.jsx";
import { initializeListing } from "../reducer/listingReducer.js";
import Ownlisting from "./pages/Ownlistingpage.jsx";
import Checkoutpage from "./pages/Checkoutpage.jsx";
import PaymentSucess from "./pages/paymentsucess.jsx";
import { setUser } from "../reducer/userReducer.js";

const App = () => {
  const dispatch = useDispatch();

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
    const user = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
    const fetchData = async () => {
      Services.setToken(user);
      if (!user && user.lenght === 0) {
        console.log("No user logged in");
        return;
      }
      try {
        console.log("Fetching user data");
        console.log(user);
        const loggedUser = await getUserData(user);
        console.log("Logged user", loggedUser);
        setUser(loggedUser);
      } catch (error) {
        if (error.error === "token expired") {
          console.log("Token expired");
          sessionStorage.removeItem("loggedNoteappUser");
          return;
        }
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);

  const user = useSelector((state) => state.user);

  console.log("App.js user", user);

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
          <Route path="/payment-successful" Component={PaymentSucess} />
          <Route path="/*" Component={Notfound} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
