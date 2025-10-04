import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    addBook: builder.mutation<IBook, Omit<IBook, "_id">>({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: { ...newBook, isAvailable: true },
      }),
      invalidatesTags: ["Books"],
    }),

    getBook: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useAddBookMutation, useGetBookQuery, useGetBookByIdQuery } =
  bookApi;
