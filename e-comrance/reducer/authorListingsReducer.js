import { createSlice } from "@reduxjs/toolkit";

const authorListingsSlice = createSlice({
  name: "authorListings",
  initialState: [],
  reducers: {
    appendauthorListings(state, action) {
      state.push(action.payload);
    },
    setauthorListings(state, action) {
      return action.payload;
    },
    clearauthorListings() {
      return [];
    },
  },
});

export const { appendauthorListings, setauthorListings, clearauthorListings } =
  authorListingsSlice.actions;

export default authorListingsSlice.reducer;
