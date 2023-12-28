import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userReducer.js";
import listingReducer from "../reducer/listingReducer.js";
import App from "./App.jsx";
import cartReducer from "../reducer/cartReducer.js";
import notificationReducer from "../reducer/notificationReducer.js";
import {
  filterReducer,
  categoryReducer,
  countryReducer,
  maxPriceReducer,
  minPriceReducer,
} from "../reducer/filterReducer.js";
import favoriteReducer from "../reducer/favoriteReducer.js";
import ownlistingReducer from "../reducer/ownlistingReducer.js";
import React from "react";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import "./App.css";
import "./styles/AddingStyles.css";
import "./styles/CartStyles.css";
import "./styles/HomeStyles.css";
import "./styles/loginStyles.css";
import "./styles/registeryStyles.css";
import "./styles/stripe.css";
import "./styles/usernavbarStyles.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import authorReducer from "../reducer/authorReducer.js";
import allUsersReducer from "../reducer/allUsersReducer.js";
import authorListingsReducer from "../reducer/authorListingsReducer.js";

const combineFilter = combineReducers({
  filter: filterReducer,
  minPrice: minPriceReducer,
  maxPrice: maxPriceReducer,
  country: countryReducer,
  category: categoryReducer,
});

const store = configureStore({
  reducer: {
    user: userReducer,
    listing: listingReducer,
    cart: cartReducer,
    notification: notificationReducer,
    filter: combineFilter,
    favorite: favoriteReducer,
    userListings: ownlistingReducer,
    author: authorReducer,
    allUsers: allUsersReducer,
    authorListings: authorListingsReducer,
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <SpeedInsights />
  </Provider>
);
