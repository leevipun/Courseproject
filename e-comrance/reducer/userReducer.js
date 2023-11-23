import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    appendUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { appendUser } = userSlice.actions;

export default userSlice.reducer;
