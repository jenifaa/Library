import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBookQuery } from "@/store/api/booksApi";

import type { IBook } from "@/types";
import { useNavigate } from "react-router";

export function BooksTable() {
  const { data: booksData = [] } = useGetBookQuery();
  const navigate = useNavigate();
  return (
    <div className="w-11/12 mx-auto">
      <div className="overflow-hidden rounded-md border mt-3 mb-14">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booksData.map((book: IBook) => (
              <TableRow key={book._id}>
                <TableCell>{book._id}</TableCell>
                <TableCell>{book.title}</TableCell>
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
                  <Button>delete</Button>
                </TableCell>
                <TableCell>
                  <Button>edit</Button>
                </TableCell>
                <TableCell>
                  <Button>borrow</Button>
                </TableCell>
                <TableCell>
                  <button onClick={() => navigate(`/books/${book._id}`)}>
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default BooksTable;
