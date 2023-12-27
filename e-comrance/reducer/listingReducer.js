import { createSlice } from "@reduxjs/toolkit";
import Services from "../src/services/Services.js";

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
    clearListing() {
      return [];
    },
  },
});

export const { appendlisting, setlisting, clearListing } = listingSlice.actions;

export const initializeListing = () => {
  return async (dispatch) => {
    const listings = await Services.getAllListings();
    dispatch(setlisting(listings));
  };
};

export default listingSlice.reducer;
