/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: [],
  inputValue: '',
  formStatus: {
    status: 'filling',
    feedback: '',
  },
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setUrls: (state, action) => {
      const urls = action.payload;
      state.urls.push(urls);
    },
    removeUrl: (state, action) => {
      const link = action.payload;
      state.urls = state.urls.filter((url) => url === link);
    },
    setInputValue: (state, action) => {
      const value = action.payload;
      state.inputValue = value;
    },
    setFormStatus: (state, action) => {
      state.formStatus = Object.assign(state.formStatus, action.payload);
    },
  },
});

export const {
  setUrls, removeUrl, setInputValue, setFormStatus,
} = inputSlice.actions;
export default inputSlice.reducer;
