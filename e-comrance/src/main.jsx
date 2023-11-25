import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userReducer.js";
import listingReducer from "../reducer/listingReducer.js";
import App from "./App.jsx";
import cartReducer from "../reducer/cartReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    listing: listingReducer,
    cart: cartReducer,
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
