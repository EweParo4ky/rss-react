import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    addFeed: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { actions } = feedsSlice;
// export const selectors = postsAdapter.getSelectors((state) => state.posts);
export default feedsSlice.reducer;
