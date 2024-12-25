import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URLS = ["http://localhost:3001"];
const BASE_URL = URLS[0];

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: "users/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;

