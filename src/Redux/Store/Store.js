// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Feature/authSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
