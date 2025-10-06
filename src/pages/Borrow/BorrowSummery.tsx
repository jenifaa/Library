import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetAllBorrowRecordsQuery } from "@/store/api/booksApi";

import { Calendar, User, Book } from "lucide-react";
import { format } from "date-fns";

export default function BorrowSummery() {
  const {
    data: borrowRecords = [],
    isLoading,
    error,
  } = useGetAllBorrowRecordsQuery();

  const [filter, setFilter] = useState<
    "all" | "borrowed" | "returned" | "overdue"
  >("all");

  const filteredRecords = borrowRecords.filter((record) => {
    if (filter === "all") return true;
    return record.status === filter;
  });

  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = new Date() > new Date(dueDate) && status === "borrowed";

    if (isOverdue) {
      return <Badge variant="destructive">Overdue</Badge>;
    }

    switch (status) {
      case "borrowed":
        return <Badge variant="secondary">Borrowed</Badge>;
      case "returned":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Returned
          </Badge>
        );
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading borrow records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Failed to load borrow records. Please try again.</p>
      </div>
    );
  }
  type FilterType = "all" | "borrowed" | "overdue" | "returned";

  return (
    <div className="w-11/12 mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Borrow Records</h1>
          <p className="text-gray-600 mt-2">
            Manage all book borrowing activities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold">
            Total Records: {borrowRecords.length}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {[
          {
            key: "all" as FilterType,
            label: "All Records",
            count: borrowRecords.length,
          },
          {
            key: "borrowed" as FilterType,
            label: "Borrowed",
            count: borrowRecords.filter(
              (r) =>
                r.status === "borrowed" && new Date() <= new Date(r.dueDate)
            ).length,
          },
          {
            key: "overdue" as FilterType,
            label: "Overdue",
            count: borrowRecords.filter(
              (r) => r.status === "borrowed" && new Date() > new Date(r.dueDate)
            ).length,
          },
          {
            key: "returned" as FilterType,
            label: "Returned",
            count: borrowRecords.filter((r) => r.status === "returned").length,
          },
        ].map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key)}
            className="flex items-center space-x-2"
          >
            <span>{label}</span>
            <Badge variant="secondary" className="ml-2">
              {count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Information</TableHead>
              <TableHead>Book Quantity</TableHead>
              <TableHead>Borrower Details</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fine</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  <Book className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No borrow records found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => {
                const daysRemaining = calculateDaysRemaining(record.dueDate);
                const isOverdue =
                  new Date() > new Date(record.dueDate) &&
                  record.status === "borrowed";

                return (
                  <TableRow key={record._id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {record.bookTitle}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {record.bookId?.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          ISBN: {record.bookId?.ISBN}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {record.quantity}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {record.borrowerName}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {record.borrowerEmail}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {record.borrowerId}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Borrowed</p>
                            <p className="text-xs text-gray-600">
                              {format(
                                new Date(record.borrowDate),
                                "MMM dd, yyyy"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">Due</p>
                            <p className="text-xs text-gray-600">
                              {format(new Date(record.dueDate), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-2">
                        {getStatusBadge(record.status, record.dueDate)}
                        {record.status === "borrowed" && !isOverdue && (
                          <span className="text-xs text-blue-600">
                            {daysRemaining} days remaining
                          </span>
                        )}
                        {isOverdue && (
                          <span className="text-xs text-red-600">
                            Overdue by {Math.abs(daysRemaining)} days
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="">
                        <span
                          className={`font-semibold ${
                            record.fineAmount > 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          ${record.fineAmount.toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900">Total Borrowed</h3>
          <p className="text-2xl font-bold text-blue-600">
            {borrowRecords.filter((r) => r.status === "borrowed").length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="font-semibold text-red-900">Overdue</h3>
          <p className="text-2xl font-bold text-red-600">
            {
              borrowRecords.filter(
                (r) =>
                  r.status === "borrowed" && new Date() > new Date(r.dueDate)
              ).length
            }
          </p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="font-semibold text-orange-900">Total Fines</h3>
          <p className="text-2xl font-bold text-orange-600">
            $
            {borrowRecords
              .reduce((sum, record) => sum + record.fineAmount, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
