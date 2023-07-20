import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthAPI } from "../../api/auth";

export const registerUser = createAsyncThunk(
  "user/fetchUserData",
  async (inputValue) => {
    // console.log("payload", inputValue);
    const newUser = {
      ...inputValue,
      role: 1,
      status: 1,
    };
    await AuthAPI.registerData(newUser);
  }
);

export const handleLogin = createAsyncThunk(
  "user/loginUser",
  async (inputValue) => {
    console.log("payload", inputValue);
    const response = await AuthAPI.loginData(inputValue);
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
    token: "",
    isLoggedIn: false,
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
