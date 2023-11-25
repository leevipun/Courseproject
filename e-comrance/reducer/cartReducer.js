import { createSlice } from "@reduxjs/toolkit";
import Services from "../src/services/Services";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    appendcart(state, action) {
      state.push(action.payload);
    },
    setcart(state, action) {
      return action.payload;
    },
  },
});

export const { appendcart, setcart } = cartSlice.actions;

export const initializecart = () => {
  return async (dispatch) => {
    const items = await Services.getAllCartItems();
    dispatch(setcart(items));
  };
};

export default cartSlice.reducer;
