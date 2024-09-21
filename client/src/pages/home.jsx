import { useState, useEffect } from "react";
import AddBookForm from "../components/add-book-form";
import BookList from "../components/book-list";
import RecommendationSection from "../components/recommendation-section";
import axios from "axios";

const api = {
  getBooks: async () => axios.get("/books").then((res) => res.data),
  addBook: (book) => axios.post("/books", book).then((res) => res.data),
  deleteBook: (id) => axios.delete(`/books/${id}`),
  recommendBook: (genre) =>
    axios.get(`/books/recommend?genre=${genre}`).then((res) => res.data),
};

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    api.getBooks().then(setBooks);
  }, []);

  const handleAddBook = (book) => {
    api.addBook(book).then((newBook) => setBooks([...books, newBook]));
  };

  const handleDeleteBook = (id) => {
    api
      .deleteBook(id)
      .then(() => setBooks(books.filter((book) => book.id !== id)));
  };

  const handleRecommend = () => {
    const genres = [...new Set(books.map((book) => book.genre))];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    api.recommendBook(randomGenre).then(setRecommendation);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Recommendation</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
          <AddBookForm onAdd={handleAddBook} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Books</h2>
          <BookList books={books} onDelete={handleDeleteBook} />
        </div>
      </div>
      <RecommendationSection
        onRecommend={handleRecommend}
        recommendation={recommendation}
      />
    </div>
  );
};

export default HomePage;
