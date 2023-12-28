import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../src/services/Services.js";

const initialState = [];

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    appendAuthor(state, action) {
      state.push(action.payload);
    },
    clearAuthor() {
      return initialState;
    },
    setAuthor(state, action) {
      return action.payload;
    },
  },
});

export const { appendAuthor, clearAuthor, setAuthor } = authorSlice.actions;

export const initializeAuthors = () => {
  return async (dispatch) => {
    const response = await getUsers();
    dispatch(setAuthor(response.data));
  };
};

export default authorSlice.reducer;
