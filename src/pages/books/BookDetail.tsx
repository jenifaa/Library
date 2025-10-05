import { useGetBookByIdQuery } from "@/store/api/booksApi";
import {  useNavigate, useParams } from "react-router";
import { ArrowLeft, BookOpen, User, Hash, Copy, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id!);
  const navigate = useNavigate();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Loading book details...</p>
      </div>
    </div>
  );

  if (isError || !book) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Not Found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/books")} className="bg-blue-600 hover:bg-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Library
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/books")}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Library
          </Button>
        </div>

        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            
         
            <div className="lg:col-span-1">
             
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl h-96 flex items-center justify-center shadow-lg mb-6">
                <BookOpen className="h-24 w-24 text-white opacity-90" />
              </div>
            
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Copy className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">Copies</span>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {book.copies}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-700">Status</span>
                  </div>
                  <Badge 
                    className={`text-lg px-3 py-1 ${
                      book.isAvailable 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    {book.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
            </div>

   
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Author */}
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {book.title}
                </h1>
                <div className="flex items-center gap-2 text-xl text-gray-700 mb-6">
                  <User className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold">by {book.author}</span>
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Hash className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900 text-lg">Genre</h3>
                  </div>
                  <Badge variant="outline" className="text-base px-4 py-2 bg-white">
                    {book.genre}
                  </Badge>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900 text-lg">ISBN</h3>
                  </div>
                  <p className="text-lg font-mono text-gray-800">{book.ISBN}</p>
                </div>
              </div>

              
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  About This Book
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {book.description || "No description available for this book."}
                </p>
              </div>

             
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={() => navigate(`/borrow-book/${book._id}`)}
                  disabled={!book.isAvailable || book.copies < 1}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {book.isAvailable && book.copies > 0 ? (
                    <>📚 Borrow This Book</>
                  ) : (
                    <>❌ Currently Unavailable</>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate("/books")}
                  className="flex-1 py-6 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
                  size="lg"
                >
                  🔍 Browse More Books
                </Button>
              </div>
            </div>
          </div>

         
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-xl font-bold mb-2">📖 Easy Borrowing</h3>
                <p className="text-blue-100">Simple process to borrow this book</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">⏱️ Flexible Duration</h3>
                <p className="text-blue-100">Choose your preferred borrowing period</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">🔔 Return Reminders</h3>
                <p className="text-blue-100">Get notified before due date</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Library Statistics</h3>
            <p className="text-gray-600">Explore our collection</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Similar Books</h3>
            <p className="text-gray-600">Discover related titles</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Reading History</h3>
            <p className="text-gray-600">Track your borrowed books</p>
          </div>
        </div>
      </div>
    </div>
  );
}