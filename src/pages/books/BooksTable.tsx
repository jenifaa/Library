import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteBookMutation,
  useGetPaginatedBooksQuery,
  useUpdateBookMutation,
} from "@/store/api/booksApi";

import type { IBook } from "@/types";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function BooksTable() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, error } = useGetPaginatedBooksQuery({
    page: currentPage,
    limit: 10
  });

  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const form = useForm<Omit<IBook, "id" | "isAvailable">>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      ISBN: "",
      description: "",
      copies: 0,
    },
  });

  const onSubmit = (data: Omit<IBook, "id" | "isAvailable">) => {
    if (!selectedBookId) return;
    updateBook({ id: selectedBookId, data });
    toast.success("Book updated successfully! ✅");
    form.reset();
  };

  const handleDelete = (id: string) => {
    deleteBook(id);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  if (!data || !data.books || data.books.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No books available in the library.</p>
      </div>
    );
  }

  const { books, pagination } = data;

  return (
    <div className="w-11/12 mx-auto">
      <div className="overflow-hidden rounded-md border mt-3 mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Borrow</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book: IBook, index) => (
              <TableRow key={book._id}>
                <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.isAvailable ? (
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Unavailable
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/borrow-book/${book._id}`)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!book.isAvailable || book.copies < 1}
                  >
                    Borrow
                  </button>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="text-sm bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => {
                          setSelectedBookId(book._id);
                          form.reset(book);
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Book</DialogTitle>
                        <DialogDescription>
                          Fill the form below to Update a book
                        </DialogDescription>
                      </DialogHeader>

                      <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem className="mt-3">
                                <FormLabel>Title</FormLabel>
                                <Input
                                  {...field}
                                  placeholder="Enter Book Title"
                                />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                              <FormItem className="mt-3">
                                <FormLabel>Author</FormLabel>
                                <Input
                                  {...field}
                                  placeholder="Enter Author Name"
                                />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                              <FormItem className="mt-3">
                                <FormLabel>Genre</FormLabel>
                                <Input {...field} placeholder="Enter Genre" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="ISBN"
                            render={({ field }) => (
                              <FormItem className="mt-3">
                                <FormLabel>ISBN</FormLabel>
                                <Input {...field} placeholder="Enter ISBN" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="mt-3">
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                  {...field}
                                  placeholder="Enter Description"
                                />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="copies"
                            render={({ field }) => (
                              <FormItem className="mt-3">
                                <FormLabel>Copies</FormLabel>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="Number of Copies"
                                  min={0}
                                />
                              </FormItem>
                            )}
                          />

                          <DialogFooter className="mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Update</Button>
                          </DialogFooter>
                        </form>
                      </FormProvider>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-sm bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="text-sm bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    <Eye size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

     
      {pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pagination.limit + 1} to{" "}
            {Math.min(currentPage * pagination.limit, pagination.totalBooks)} of{" "}
            {pagination.totalBooks} books
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksTable;