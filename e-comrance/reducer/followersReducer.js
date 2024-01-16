import {createSlice} from '@reduxjs/toolkit';
import {getAllFollowers} from '../src/services/friendsServices.js.js';

const initialState = [];

const followersSlice = createSlice({
  name: 'Followers',
  initialState,
  reducers: {
    appendFollowers(state, action) {
      state.push(action.payload);
    },
    clearFollowers() {
      return initialState;
    },
    setFollowers(state, action) {
      return action.payload;
    },
  },
});

export const {appendFollowers, clearFollowers, setFollowers} =
  followersSlice.actions;

export const initializeFollowers = () => {
  return async (dispatch) => {
    const response = await getAllFollowers();
    console.log('response.data', response);
    dispatch(setFollowers(response));
  };
};

export default followersSlice.reducer;
