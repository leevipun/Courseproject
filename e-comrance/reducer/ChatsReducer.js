import { createSlice } from "@reduxjs/toolkit";
import { getAdminChats, getAllChats } from "../src/services/Services.js";

const ChatsSlice = createSlice({
  name: "Chats",
  initialState: [],
  reducers: {
    appendChats(state, action) {
      state.push(action.payload);
    },
    setChats(state, action) {
      return action.payload;
    },
    clearChats() {
      return [];
    },
  },
});

export const { appendChats, setChats, clearChats } = ChatsSlice.actions;

export const initializeChats = () => {
  return async (dispatch) => {
    const response = await getAllChats();
    dispatch(setChats(response.Chatss));
  };
};

export const initializeAdminChats = () => {
  return async (dispatch) => {
    const response = await getAdminChats();
    console.log(response.data);
    dispatch(setChats(response.data));
  };
};

export default ChatsSlice.reducer;
