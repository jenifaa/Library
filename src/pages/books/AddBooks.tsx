import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { useAddBookMutation, useGetBookQuery } from "@/store/api/booksApi";
import type { IBook } from "@/types";
import { toast } from "react-toastify";
import { Link } from "react-router";
export default function AddBooks() {
  const [addBook] = useAddBookMutation();
  const form = useForm<Omit<IBook, "id" | "isAvailable">>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      ISBN: "",
      description: "",
      copies: "",
    },
  });

  const onSubmit = async (data: Omit<IBook, "id" | "isAvailable">) => {
    await addBook({ ...data, isAvailable: true });
    toast.success("Book added successfully! ✅");
    form.reset();
  };

  const { data: booksData = [] } = useGetBookQuery();
  return (
    <div>
      {" "}
      <div className="flex justify-between items-center my-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-6 py-5 bg-blue-300 border-b-4 rounded-xl border-black text-white">
              Add a New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add A New Book</DialogTitle>
              <DialogDescription>
                Fill the form below to add a book
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Title</FormLabel>
                      <Input {...field} placeholder="Enter Book Title" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Author</FormLabel>
                      <Input {...field} placeholder="Enter Author Name" />
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
                      <Textarea {...field} placeholder="Enter Description" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Copies</FormLabel>
                      <Input {...field} placeholder="Number of Copies" />
                    </FormItem>
                  )}
                />
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Button className="px-5 py-2 bg-blue-300 text-semibold border-b-4 rounded-xl border-black">
          Search by Title
        </Button>
      </div>
      <div className="w-11/12 mx-auto my-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Library Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {booksData.map((book) => (
            <div
              key={book._id}
              className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {book.title}
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-black">Author:</span>
                  <span className="text-gray-700">{book.author}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-black">Genre:</span>
                  <span className="text-gray-700">{book.genre}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-black">ISBN:</span>
                  <span className="text-gray-700">{book.ISBN}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-black">Copies:</span>
                  <span className="text-gray-700">{book.copies}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-black">Status:</span>
                  <span
                    className={`font-semibold ${
                      book.isAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {book.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex justify-between">
                <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                  Borrow
                </button>
                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                  Delete
                </button>
                <Link to="/detail" className="text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
