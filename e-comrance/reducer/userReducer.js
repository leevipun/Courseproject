import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    appendUser(state, action) {
      state.push(action.payload);
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { appendUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
