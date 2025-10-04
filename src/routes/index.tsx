import { createBrowserRouter } from "react-router";
import App from "../App";

import Books from "@/pages/books/Books";
import Home from "@/pages/Home/Home";
import BooksTable from "@/pages/books/BooksTable";
import AddBooks from "@/pages/books/AddBooks";
import BookDetail from "@/pages/books/BookDetail";
import BorrowBooks from "@/pages/Borrow/BorrowBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/book",
        element: <Books></Books>,
      },
      {
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        element: <BooksTable></BooksTable>,
      },
      {
        path: "/add",
        element: <AddBooks></AddBooks>,
      },
      {
        path: "/books/:id",
        element: <BookDetail></BookDetail>,
      },
      {
        path: "/borrow",
        element: <BorrowBooks></BorrowBooks>,
      },
    ],
  },
]);
export default router;
