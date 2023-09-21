/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feeds: [],
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    addFeed: (state, action) => {
      state.feeds.unshift(action.payload);
      console.log('state in feeedsss', state);
    },
    removeFeed: (state, action) => {
      const feedId = action.payload;
      state.feeds = state.feeds.filter((feed) => feed.id !== feedId);
    },
  },
});

export const { actions } = feedsSlice;
export default feedsSlice.reducer;
