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
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { appendUser, clearUser, setUser } = userSlice.actions;

export default userSlice.reducer;
