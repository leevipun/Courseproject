import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services from "./services/Services.js";
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
import { appendlisting } from "../reducer/listingReducer.js";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggerUser = window.localStorage.getItem("loggedNoteappUser");
    if (loggerUser) {
      const user = JSON.parse(loggerUser);
      Services.setToken(`${user.token}`);
      console.log("Lisättiin token");
    }
  });

  useEffect(() => {
    const listings = Services.getAllListings();
    console.log("Listings", listings);
    dispatch(appendlisting(listings));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Homepage} />
        <Route path="/about" Component={Aboutpage} />
        <Route path="/cart" Component={Cartpage} />
        <Route path="/login" Component={Loginpage} />
        <Route path="/register" Component={Registerypage} />
        <Route path="/favorites" Component={Favoritepage} />
        <Route path="/user" Component={Userpage} />
        <Route path="/contacts" Component={Contactpage} />
        <Route path="/add" Component={AddingPage} />
        <Route path="/*" Component={Notfound} />
      </Routes>
    </Router>
  );
};

export default App;
