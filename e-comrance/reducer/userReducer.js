import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../src/services/emailServices.js";

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
    try {
      const response = await getUserData();
      console.log(response, "User");
      dispatch(setUser(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export default userSlice.reducer;
