export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  ISBN: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}
export interface IBorrow{
  _id: string;
  bookId: {
    _id: string;
    title: string;
    author: string;
    ISBN: string;
  };
  bookTitle: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowerId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  fineAmount: number;
}
