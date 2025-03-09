import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for newUser and credentials
type NewUser = {
  name: string;
  email: string;
  password: string;
  id: string;
  date: number;
};

type Credentials = {
  email: string;
  password: string;
};

type User = {
  date: string;
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
  token: string
}

const URLS = ["http://localhost:3001"];
const BASE_URL = URLS[0];

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    signup: builder.mutation<User, NewUser>({
      query: (newUser: NewUser) => ({
        url: "users/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    login: builder.mutation<User, Credentials>({
      query: (credentials: Credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
