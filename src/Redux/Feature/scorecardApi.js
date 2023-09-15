import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const scorecardApi = createApi({
  reducerPath: "scorecardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getScoreCard: builder.query({
      query: (id) => `scorecard/${id}`,
    }),
    addScoreCard: builder.mutation({
      query: (newScorecard) => ({
        url: "scorecard",
        method: "POST",
        body: newScorecard,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddScoreCardMutation,useGetScoreCardQuery } = scorecardApi;
