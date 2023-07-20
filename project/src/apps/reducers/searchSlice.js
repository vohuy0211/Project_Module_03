import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    handleSearch: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { actions, reducer } = searchSlice;
export const { handleSearch } = actions;
export default reducer;
