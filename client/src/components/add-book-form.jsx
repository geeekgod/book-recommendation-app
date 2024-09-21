import { useState } from "react";
import { Plus } from "lucide-react";
import { useBook } from "../hooks";

const AddBookForm = () => {
  const { addBook } = useBook();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleAddBook = async (book) => {
    await addBook(book);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddBook({ title, author, genre });
    } catch (error) {
      console.error("Error while submitting Add Book Form: ", error);
    } finally {
      setTitle("");
      setAuthor("");
      setGenre("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        <Plus className="inline mr-2" size={18} />
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
