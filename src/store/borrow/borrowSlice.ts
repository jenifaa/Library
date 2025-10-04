import type { IBook } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  books: IBook[];
}
const initialState: InitialState = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (
      state,
      action: PayloadAction<Omit<IBook, "id" | "isAvailable">>
    ) => {
      const bookData: IBook = {
        ...action.payload,

        isAvailable: true,
      };
      state.books.push(bookData);
    },
  },
});
export const { addBook } = bookSlice.actions;
export default bookSlice.reducer;
