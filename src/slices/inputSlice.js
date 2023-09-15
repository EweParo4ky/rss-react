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
    setInputValue: (state, action) => {
      const value = action.payload;
      state.inputValue = value;
    },
    setFormStatus: (state, action) => {
      state.formStatus = Object.assign(state.formStatus, action.payload);
    },
  },
});

export const { setUrls, setInputValue, setFormStatus } = inputSlice.actions;
export default inputSlice.reducer;
