import { createSlice } from "@reduxjs/toolkit";
import Services from "../src/services/Services";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    appendfavorite(state, action) {
      state.push(action.payload);
    },
    setfavorite(state, action) {
      return action.payload;
    },
  },
});

export const { appendfavorite, setfavorite } = favoriteSlice.actions;

export const initializefavorite = () => {
  return async (dispatch) => {
    const items = await Services.getAllfavoriteItems();
    dispatch(setfavorite(items));
  };
};

export default favoriteSlice.reducer;
