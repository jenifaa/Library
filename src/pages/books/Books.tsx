import { Link } from "react-router";
import Book from "./Book";

const booksData = [
  {
    id: "1",
    title: "The Silent Library",
    author: "Elaine Porter",
    genre: "Mystery",
    ISBN: "978-1-23456-789-7",
    description: "A gripping tale of secrets hidden within an ancient library.",
    copies: "4",
    isAvailable: true,
  },
  {
    id: "2",
    title: "Journey Through Code",
    author: "Liam Edwards",
    genre: "Technology",
    ISBN: "978-0-55321-478-2",
    description:
      "An introduction to programming narrated like an adventure story.",
    copies: "2",
    isAvailable: false,
  },
  {
    id: "3",
    title: "Whispers of the Wind",
    author: "Sofia Blake",
    genre: "Fantasy",
    ISBN: "978-1-87654-321-9",
    description:
      "A young girl's quest to save her village from ancient spirits.",
    copies: "6",
    isAvailable: true,
  },
  {
    id: "4",
    title: "Mindful Moments",
    author: "Dr. Hayden Wells",
    genre: "Self-Help",
    ISBN: "978-0-43987-123-4",
    description: "A collection of short meditative practices for daily peace.",
    copies: "3",
    isAvailable: true,
  },
  {
    id: "5",
    title: "Cosmic Frontiers",
    author: "Nora Patel",
    genre: "Science Fiction",
    ISBN: "978-1-90876-543-2",
    description: "A crew of explorers uncovers a galaxy-shifting secret.",
    copies: "1",
    isAvailable: false,
  },
];

export default function Books() {
  return (
    <div>
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {booksData.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
      <div className="flex justify-center items-center my-5">
        <Link to='/books' className="px-5 py-2 bg-blue-300 text-semibold border-b-4 rounded-xl border-black">See More Book</Link>
      </div>
    </div>
  );
}
