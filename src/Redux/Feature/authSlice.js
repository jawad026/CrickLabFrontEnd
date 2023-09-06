// authSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API endpoints
const API_ENDPOINT = "http://localhost:3000/"; // Replace with your API endpoint

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "users/login", // Replace with your login API endpoint
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
