/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  postId: '',
  viewedPostsIds: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpened = !state.isOpened;
      state.postId = action.payload;
      state.viewedPostsIds.push(action.payload);
    },
    closeModal: (state) => {
      state.isOpened = !state.isOpened;
      state.postId = null;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
