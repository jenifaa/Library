import { createBrowserRouter } from "react-router";
import App from "../App";

import Books from "@/pages/books/Books";
import Home from "@/pages/Home/Home";
import BooksTable from "@/pages/books/BooksTable";
import AddBooks from "@/pages/books/AddBooks";
import BookDetail from "@/pages/books/BookDetail";
import BorrowBooks from "@/pages/Borrow/BorrowBooks";
import BorrowSummery from "@/pages/Borrow/BorrowSummery";

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
        path: "/create-book",
        element: <AddBooks></AddBooks>,
      },
      {
        path: "/books/:id",
        element: <BookDetail></BookDetail>,
      },
      {
       path:"/borrow-book/:bookId",
        element: <BorrowBooks></BorrowBooks>,
      },
      {
        path:"/borrow-summary",
        element:<BorrowSummery></BorrowSummery>
      }
    ],
  },
]);
export default router;
