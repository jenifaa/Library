import { useGetBookByIdQuery } from "@/store/api/booksApi";

import { useParams } from "react-router";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id!);

  if (isLoading) return <div className="text-center mt-20 text-lg">Loading book details...</div>;
  if (isError || !book) return <div className="text-center mt-20 text-red-600 text-lg">Book not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">{book.title}</h1>
        <span
          className={`px-4 py-2 rounded-full font-semibold ${
            book.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {book.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Author & Genre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-lg text-gray-700">
        <div>
          <span className="font-semibold text-gray-900">Author:</span> {book.author}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Genre:</span> {book.genre}
        </div>
      </div>

      {/* ISBN & Copies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-lg text-gray-700">
        <div>
          <span className="font-semibold text-gray-900">ISBN:</span> {book.ISBN}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Copies:</span> {book.copies}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Description</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
          Borrow Book
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition">
          Back to Library
        </button>
      </div>
    </div>
  );
}
