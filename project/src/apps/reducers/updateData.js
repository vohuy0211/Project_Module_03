import { createSlice } from "@reduxjs/toolkit";

const productBookSlice = createSlice({
  name: "productBook",
  initialState: false,
  reducers: {
    updateState: (state) => {
      return !state;
    },
  },
});

const { actions, reducer } = productBookSlice;
export const { updateState } = actions;
export default reducer;
