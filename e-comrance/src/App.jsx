import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

import "./App.css";

import Loginpage from "./pages/Loginpage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Aboutpage from "./pages/Aboutpage.jsx";
import Cartpage from "./pages/Cartpage.jsx";
import Registerypage from "./pages/Reqisterypage.jsx";
import Favoritepage from "./pages/Favorites.jsx";
import Userpage from "./pages/Userpage.jsx";
import Notfound from "./pages/Notfound.jsx";
import Contactpage from "./pages/Contactpage.jsx";
import AddingPage from "./pages/Addingpage.jsx";
import Notification from "./components/notification.jsx";
import Ownlisting from "./pages/Ownlistingpage.jsx";
import Checkoutpage from "./pages/Checkoutpage.jsx";
import PaymentSucess from "./pages/paymentsucess.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AuthorPage from "./pages/AuthorPage.jsx";
import AuthorInspect from "./pages/AuthorInspect.jsx";
import BuyHistoryPage from "./pages/Buyhistorypage.jsx";
import Friendspage from "./pages/Friendspage.jsx";
import Chatpage from "./pages/Chatpage.jsx";
import Adminpage from "./pages/Adminpage.jsx";

const App = () => {
  return (
    <>
      <Notification />
      <Router>
        <Routes>
          <Route path="/" exact Component={Homepage} />
          <Route path="/admin" Component={Adminpage} />
          <Route path="/about" Component={Aboutpage} />
          <Route path="/cart" Component={Cartpage} />
          <Route path="/checkout" Component={Checkoutpage} />
          <Route path="/login" Component={Loginpage} />
          <Route path="/register" Component={Registerypage} />
          <Route path="/favorites" Component={Favoritepage} />
          <Route path="/friends" Component={Friendspage} />
          <Route path="/user" Component={Userpage} />
          <Route path="/contacts" Component={Contactpage} />
          <Route path="/chats" Component={Chatpage} />
          <Route path="/add" Component={AddingPage} />
          <Route path="authors" Component={AuthorPage} />
          <Route path="/ownlisting" Component={Ownlisting} />
          <Route path="/users/:id" Component={AuthorInspect} />
          <Route path="/payment-successful" Component={PaymentSucess} />
          <Route path="/chats/:id" Component={Chatpage} />
          <Route path="/buyhistory" Component={BuyHistoryPage} />
          <Route path="/*" Component={Notfound} />
        </Routes>
      </Router>
      <SpeedInsights />
    </>
  );
};

export default App;
