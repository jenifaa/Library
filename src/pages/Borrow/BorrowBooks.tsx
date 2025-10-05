import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useGetBookByIdQuery } from "@/store/api/booksApi"; 
import { useBorrowBookMutation } from "@/store/api/booksApi"; 
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

interface BorrowFormData {
  bookId: string;
  bookTitle: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowerId: string;
  borrowerPhone: string;
  borrowDate: Date;
  dueDate: Date;
  quantity: number;
  additionalNotes?: string;
}

export default function BorrowBooks() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useGetBookByIdQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BorrowFormData>({
    defaultValues: {
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      quantity: 1,
    },
  });

  useEffect(() => {
    if (book) {
      form.setValue("bookId", book._id);
      form.setValue("bookTitle", book.title);
    }
  }, [book, form]);

  const onSubmit = async (data: BorrowFormData) => {
    if (!book) return;
    
    setIsSubmitting(true);
    try {
      await borrowBook(data).unwrap();
      toast.success(`Successfully borrowed ${data.quantity} copy(s) of "${book.title}"! 📚`);
      
      // Redirect after success
      setTimeout(() => {
        navigate("/books");
      }, 2000);
      
    } catch (error: unknown) {
      console.error("Borrow error:", error);
      
      // Handle RTK Query error
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data?.message || "Failed to borrow book. Please try again.");
      } else {
        toast.error("Failed to borrow book. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Book ID from URL:", bookId);
  
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">Loading book information...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-red-600">
          Book not found or error loading book information.
        </div>
        <Button 
          onClick={() => navigate("/books")} 
          className="mt-4"
        >
          Back to Books
        </Button>
      </div>
    );
  }

  if (!book.isAvailable || book.copies < 1) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-red-600 mb-4">
          <h2 className="text-xl font-bold">Book Not Available</h2>
          <p>This book is currently not available for borrowing.</p>
        </div>
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h3 className="font-semibold text-red-800">Book Information:</h3>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Status:</strong> Not Available</p>
          <p><strong>Available Copies:</strong> {book.copies}</p>
        </div>
        <Button 
          onClick={() => navigate("/books")} 
          className="mt-4 w-full"
        >
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Borrow a Book</h1>
      
    
      <div className="p-6 border border-green-200 rounded-lg bg-green-50 mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Book Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
          </div>
          <div>
            <p><strong>ISBN:</strong> {book.ISBN}</p>
            <p><strong>Available Copies:</strong> {book.copies}</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium">Available</span></p>
          </div>
        </div>
        {book.description && (
          <div className="mt-4">
            <p><strong>Description:</strong></p>
            <p className="text-sm text-gray-600 mt-1">{book.description}</p>
          </div>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="borrowerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="borrowerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student/Library ID *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your ID number" 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="borrowerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="borrowerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How Many Books You Want? *</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min={1}
                    max={book.copies}
                    placeholder={`Enter quantity (1-${book.copies})`}
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > book.copies) {
                        field.onChange(book.copies);
                      } else if (value < 1) {
                        field.onChange(1);
                      } else {
                        field.onChange(value);
                      }
                    }}
                    required
                  />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="borrowDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Borrow Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Date when you're borrowing the book
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Expected return date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Notes */}
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or notes..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional notes about your borrowing request
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms and Conditions */}
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2">Terms & Conditions:</h3>
            <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Maximum borrowing period is 30 days</li>
              <li>Books must be returned in good condition</li>
              <li>Late returns will incur fines ($1 per day)</li>
              <li>You are responsible for lost or damaged books</li>
              <li>Maximum 5 copies per borrower</li>
              <li>Quantity cannot exceed available copies</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/books")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? "Processing..." : "Borrow Book"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}