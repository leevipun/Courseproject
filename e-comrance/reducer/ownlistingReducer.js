import {createSlice} from '@reduxjs/toolkit';
import {getUsersListings} from '../src/services/userServices.js';

const userListingSlice = createSlice({
  name: 'userListing',
  initialState: [],
  reducers: {
    appendUserListing(state, action) {
      state.push(action.payload);
    },
    setUserListing(state, action) {
      return action.payload;
    },
    clearUserListing() {
      return [];
    },
  },
});

export const {appendUserListing, setUserListing, clearUserListing} =
  userListingSlice.actions;

export const initializeUserListing = () => {
  return async (dispatch) => {
    const userListing = await getUsersListings();
    dispatch(setUserListing(userListing));
  };
};

export default userListingSlice.reducer;
