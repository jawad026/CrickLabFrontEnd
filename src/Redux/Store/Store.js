import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { matchApi } from "../Feature/matchApi";
import { seriesApi } from "../Feature/seriesApi";
import { authApi } from "../Feature/authApi";
import { teamApi } from "../Feature/teamApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      matchApi.middleware,
      seriesApi.middleware,
      authApi.middleware,
      teamApi.middleware,
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
