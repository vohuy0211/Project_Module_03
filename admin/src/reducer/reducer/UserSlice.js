import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthAPI } from "../../api/user";

export const handleLogin = createAsyncThunk(
  "user/loginUser",
  async (inputValue) => {
    console.log("payload", inputValue);
    const response = await AuthAPI.Login(inputValue);
    console.log("hahahah ==>", response.data);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.accessToken);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    isLoggedIn: false,
    token: "",
    error: false,
  },
  reducers: {},
  extraReducers: {
    [handleLogin.fulfilled]: (state, action) => {
      state.data = action.payload?.data?.user;
      state.token = action.payload?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});

const { actions, reducer } = userSlice;

export default reducer;
