import { configureStore } from '@reduxjs/toolkit';
import feedsReducer from './feedsSlice';
import postsReducer from './postsSlice';

export default configureStore({
  reducer: {
    feeds: feedsReducer,
    posts: postsReducer,
  },
});
