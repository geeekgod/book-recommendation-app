import { Trash2 } from "lucide-react";
import { useBook } from "../hooks";

const BookList = () => {
  const { books, deleteBook } = useBook();
  const handleDeleteBook = async (id) => {
    await deleteBook(id);
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books &&
        books.map((book) => (
          <div key={book.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-500">{book.genre}</p>
            <button
              onClick={async () => handleDeleteBook(book.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default BookList;
