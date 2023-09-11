import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const matchApi = createApi({
  reducerPath: "matchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getMatchAll: builder.query({
      query: () => `match`,
      pollingInterval: 5000,
    }),

    // Add a new series
    addMatch: builder.mutation({
      query: (newMatch) => ({
        url: "match/addmatch",
        method: "POST",
        body: newMatch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMatchAllQuery, useAddMatchMutation } = matchApi;
