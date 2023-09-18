/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toogleModal: (state, action) => {
      state.isOpened = !state.isOpened;
      state.postId = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { toogleModal } = modalSlice.actions;
