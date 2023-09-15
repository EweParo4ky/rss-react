import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.unshift(...action.payload);
    },
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
