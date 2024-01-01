import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../src/services/Services.js";

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

export const initializeUser = () => {
  return async (dispatch) => {
    const response = await getUserData();
    console.log(response, "User");
    dispatch(setUser(response));
  };
};

export default userSlice.reducer;
