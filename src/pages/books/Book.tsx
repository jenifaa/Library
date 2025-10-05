import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, User, Hash, Copy } from "lucide-react";
import { useNavigate } from "react-router";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  ISBN: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}

interface IProps {
  book: Book;
}

export default function Book({ book }: IProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant={book.isAvailable ? "default" : "destructive"}
            className={`${
              book.isAvailable
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            } border-0 font-medium`}
          >
            {book.isAvailable ? "Available" : "Checked Out"}
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            {book.genre}
          </Badge>
        </div>

        <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
      </CardHeader>

      <CardContent className="">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span className="font-medium">{book.author}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
          <Hash className="w-3 h-3" />
          <span>ISBN: {book.ISBN}</span>
        </div>

        <div className="mb-2">
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {book.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Copy className="w-4 h-4" />
            <span>
              <span className="font-semibold">{book.copies}</span>
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => navigate(`/books/${book._id}`)}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
