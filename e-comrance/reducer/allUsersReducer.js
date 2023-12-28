import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../src/services/Services.js";

const initialState = [];

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    appendAllUsers(state, action) {
      state.push(action.payload);
    },
    clearAllUsers() {
      return initialState;
    },
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const { appendAllUsers, clearAllUsers, setAllUsers } =
  allUsersSlice.actions;

export const initializeAllusers = () => {
  return async (dispatch) => {
    const response = await getUsers();
    dispatch(setAllUsers(response.data));
  };
};

export default allUsersSlice.reducer;
