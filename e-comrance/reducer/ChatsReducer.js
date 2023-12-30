import { createSlice } from "@reduxjs/toolkit";
import { getAllChats } from "../src/services/Services.js";

const ChatsSlice = createSlice({
  name: "Chats",
  initialState: [],
  reducers: {
    appendChats(state, action) {
      state.push(action.payload);
    },
    setChatss(state, action) {
      return action.payload;
    },
    clearChats() {
      return [];
    },
  },
});

export const { appendChats, setChatss, clearChats } = ChatsSlice.actions;

export const initializeChats = () => {
  return async (dispatch) => {
    const response = await getAllChats();
    dispatch(setChatss(response.Chatss));
  };
};

export default ChatsSlice.reducer;
