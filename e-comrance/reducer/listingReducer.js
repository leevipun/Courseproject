import { createSlice } from "@reduxjs/toolkit";
import Services from "../src/services/Services";

const listingSlice = createSlice({
  name: "listing",
  initialState: [],
  reducers: {
    appendlisting(state, action) {
      state.push(action.payload);
    },
    setlisting(state, action) {
      return action.payload;
    },
  },
});

export const { appendlisting, setlisting } = listingSlice.actions;

export const initializeListing = () => {
  return async (dispatch) => {
    const blogs = await Services.getAllListings();
    dispatch(setlisting(blogs));
  };
};

export default listingSlice.reducer;
