import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userReducer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
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
  </Provider>
);
