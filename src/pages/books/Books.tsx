import { Link } from "react-router";
import Book from "./Book";
import { useGetBookQuery } from "@/store/api/booksApi";
import { useState, useEffect } from "react";
import type { IBook } from "@/types"; 

export default function Books() {
  const { data: booksData = [], isLoading, error } = useGetBookQuery();
  const [displayedBooks, setDisplayedBooks] = useState<IBook[]>([]); 

  useEffect(() => {
    if (booksData.length > 0) {
      const shuffled = [...booksData].sort(() => 0.5 - Math.random());
      setDisplayedBooks(shuffled.slice(0, 5));
    }
  }, [booksData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Failed to load books. Please try again.</p>
      </div>
    );
  }

  if (!booksData || booksData.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No books available in the library.</p>
        <Link to="/add-book" className="text-blue-600 hover:underline mt-2 inline-block">
          Add the first book
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mt-20 font mb-5 text-5xl font-bold">Explore Our Books...</h2>
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {displayedBooks.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
      <div className="flex justify-center items-center my-5">
        <Link 
          to='/books' 
          className="px-5 py-2 bg-blue-500 text-white font-semibold border-b-4 rounded-xl border-black hover:bg-blue-700 transition-colors"
        >
          Explore More Books
        </Link>
      </div>
    </div>
  );
}