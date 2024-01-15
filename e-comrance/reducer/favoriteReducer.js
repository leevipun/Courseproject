import { createSlice } from "@reduxjs/toolkit";
import { getAllFavoriteItems } from "../src/services/emailServices.js";

const initialState = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    appendfavorite(state, action) {
      state.push(action.payload);
    },
    setfavorite(state, action) {
      return action.payload;
    },
    clearFavorite() {
      return initialState;
    },
  },
});

export const { appendfavorite, setfavorite, clearFavorite } =
  favoriteSlice.actions;

export const initializefavorite = () => {
  return async (dispatch) => {
    const items = await getAllFavoriteItems();
    dispatch(setfavorite(items));
  };
};

export default favoriteSlice.reducer;
