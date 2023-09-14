import { configureStore } from '@reduxjs/toolkit';
import feedsReducer from '../slices/feedsSlice';
import postsReducer from '../slices/postsSlice';

export default configureStore({
reducer: {
    feeds: feedsReducer,
    posts: postsReducer,
}
});