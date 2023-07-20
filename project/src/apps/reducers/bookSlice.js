import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookAPI } from "../../api/book";

export const getAllBooks = createAsyncThunk("book/fetchDataBook", async () => {
  try {
    const response = await bookAPI.getDataBook();
    return response;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = bookSlice;

export default reducer;
