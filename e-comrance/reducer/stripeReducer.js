import { createSlice } from "@reduxjs/toolkit";
import Services from "../src/services/Services";

const initialState = "";

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    appendstripe(state, action) {
      state.push(action.payload);
    },
    setstripe(state, action) {
      return action.payload;
    },
    clearstripe() {
      return initialState;
    },
  },
});

export const { appendstripe, setstripe, clearstripe } = stripeSlice.actions;

export const initializestripe = () => {
  return async (dispatch) => {
    const items = await Services.getAllstripeItems();
    dispatch(setstripe(items));
  };
};

export default stripeSlice.reducer;
