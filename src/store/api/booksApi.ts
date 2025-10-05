import type { IBook, IBorrow } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
tagTypes: ['Books', 'Borrow'],
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
      query: () => "/all-books",
      providesTags: ["Books"],
    }),

    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
    }),

    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/edit-book/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
     borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: '/borrow-book',
        method: 'POST',
        body: borrowData,
      }),
       invalidatesTags: ['Books', 'Borrow'],
    }),
     getAllBorrowRecords: builder.query<IBorrow[], void>({
      query: () => '/borrow-summary',
      providesTags: ['Borrow'],
    }),


 getPaginatedBooks: builder.query<{
      books: IBook[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalBooks: number;
        hasNext: boolean;
        hasPrev: boolean;
        limit: number;
      };
    }, { page: number; limit?: number }>({
      query: ({ page, limit = 10 }) => 
        `books?page=${page}&limit=${limit}`,
      providesTags: ['Books'],
    }),


  }),
});

export const {
  useAddBookMutation,
  useGetBookQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation ,
  useGetAllBorrowRecordsQuery,
  useGetPaginatedBooksQuery
} = bookApi;
