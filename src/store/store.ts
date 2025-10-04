import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/booksApi";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
