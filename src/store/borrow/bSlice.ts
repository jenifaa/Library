import type { IBook } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  borrowBooks: IBook[];
}
const initialState: InitialState = {
  borrowBooks: [],
};

const borrowBookSlice = createSlice({
  name: "borrowBook",
  initialState,
  reducers: {
    borrowBook: (
      state,
      action: PayloadAction<Omit<IBook, "id" | "isAvailable">>
    ) => {
      const borrowData: IBook = {
        ...action.payload,

        isAvailable: true,
      };
      state.borrowBooks.push(borrowData);
    },
  },
});
export const { borrowBook } = borrowBookSlice.actions;
export default borrowBookSlice.reducer;
