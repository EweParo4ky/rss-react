/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';

const initialState = {
  posts: [],
  status: null,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts.unshift(...action.payload);
    },
    removePosts: (state, action) => {
      const removedFeedId = action.payload;
      state.posts = state.posts.filter((post) => post.feedId !== removedFeedId);
    },
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
