// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signIn",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (newUser) => ({
        url: "/auth/signUp",
        method: "POST",
        body: newUser,
      }),
    }),
    user: builder.query({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useUserQuery } = authApi;
