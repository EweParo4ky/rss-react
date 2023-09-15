import { configureStore } from '@reduxjs/toolkit';
import feedsReducer from './feedsSlice';
import postsReducer from './postsSlice';
import inputSlice from './inputSlice';

export default configureStore({
  reducer: {
    feeds: feedsReducer,
    posts: postsReducer,
    input: inputSlice,
  },
});
