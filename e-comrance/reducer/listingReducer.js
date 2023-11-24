import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
  name: "listing",
  initialState: [],
  reducers: {
    appendlisting(state, action) {
      state.push(action.payload);
    },
  },
});

export const { appendlisting } = listingSlice.actions;

export default listingSlice.reducer;
