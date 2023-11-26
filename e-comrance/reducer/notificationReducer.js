import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "Notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
