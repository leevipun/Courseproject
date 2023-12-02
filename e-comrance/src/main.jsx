import React from "react";
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
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
