import { createSlice } from "@reduxjs/toolkit";
import { getAllMessages } from "../src/services/Services.js";

const messageSlice = createSlice({
  name: "Message",
  initialState: [],
  reducers: {
    appendMessage(state, action) {
      state.push(action.payload);
    },
    setMessages(state, action) {
      return action.payload;
    },
    clearMessage() {
      return [];
    },
  },
});

export const { appendMessage, setMessages, clearMessage } =
  messageSlice.actions;

export const initializeMessage = () => {
  return async (dispatch) => {
    const response = await getAllMessages();
    dispatch(setMessages(response.messages));
  };
};

export default messageSlice.reducer;
