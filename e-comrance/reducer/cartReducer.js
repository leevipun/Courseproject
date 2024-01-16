import {createSlice} from '@reduxjs/toolkit';
import {getAllCartItems} from '../src/services/cartServices.js';
import {getAdminCartItems} from '../src/services/adminServices.js';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    appendcart(state, action) {
      state.push(action.payload);
    },
    setcart(state, action) {
      return action.payload;
    },
    clearCart() {
      return initialState;
    },
  },
});

export const {appendcart, setcart, clearCart} = cartSlice.actions;

export const initializecart = () => {
  return async (dispatch) => {
    const items = await getAllCartItems();
    dispatch(setcart(items));
  };
};

export const initializeAdminCart = (id) => {
  return async (dispatch) => {
    const items = await getAdminCartItems(id);
    dispatch(setcart(items));
  };
};

export default cartSlice.reducer;
