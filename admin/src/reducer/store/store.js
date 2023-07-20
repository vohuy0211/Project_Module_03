import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/UserSlice";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
