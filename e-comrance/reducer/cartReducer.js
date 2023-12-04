import { createSlice } from "@reduxjs/toolkit";
import Services from "../src/services/Services";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    appendcart(state, action) {
      state.push(action.payload);
    },
    setcart(state, action) {
      return action.payload;
    },
    clearCart() {
      return initialState;
    },
  },
});

export const { appendcart, setcart, clearCart } = cartSlice.actions;

export const initializecart = () => {
  return async (dispatch) => {
    const items = await Services.getAllCartItems();
    dispatch(setcart(items));
  };
};

export default cartSlice.reducer;
