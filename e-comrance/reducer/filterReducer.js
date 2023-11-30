import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {
    appendfilter(state, action) {
      state.push(action.payload);
    },
    setfilter(state, action) {
      return action.payload;
    },
  },
});

export const { appendfilter, setfilter } = filterSlice.actions;
export default filterSlice.reducer;
