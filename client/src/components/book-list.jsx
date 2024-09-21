import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const BookList = ({ books, onDelete }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {books.map((book) => (
      <div key={book.id} className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500">{book.genre}</p>
        <button
          onClick={() => onDelete(book.id)}
          className="mt-2 text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ))}
  </div>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
