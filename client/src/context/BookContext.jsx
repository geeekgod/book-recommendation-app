import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks";

export const BookContext = createContext({});

export const BookContextProvider = ({ children }) => {
  const { isLoggedIn, logOut } = useAuth();
  const [books, setBooks] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("/books");
      if (response.status === 200 && response.data) setBooks(response.data);
      else console.error("Request sent successfully but no data found!");
    } catch (error) {
      if (error.response && error.response.status === 401) logOut();
      else console.error("Failed to fetch books:", error);
    }
  }, [logOut]);

  const addBook = async (book) => {
    try {
      const response = await axios.post("/books", book);
      if (response.status === 201 && response.data) await fetchBooks();
      else console.error("Request sent successfully but no data found!");
    } catch (error) {
      if (error.response && error.response.status === 401) logOut();
      else console.error("Failed to Add a book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(`/books/${id}`);
      if (response.status === 200 && response.data) await fetchBooks();
      else console.error("Request sent successfully but no data found!");
    } catch (error) {
      if (error.response && error.response.status === 401) logOut();
      else console.error("Failed to Delete a book:", error);
    }
  };

  const recommendBook = async (genre) => {
    try {
      const response = await axios.get(`/books/recommend?genre=${genre}`);
      if (response.status === 200 && response.data)
        setRecommendation(response.data);
      else console.error("Request sent successfully but no data found!");
    } catch (error) {
      if (error.response && error.response.status === 401) logOut();
      else console.error("Failed to fetch a recommended book:", error);
    }
  };

  const handleRecommend = async () => {
    try {
      const genres = [...new Set(books.map((book) => book.genre))];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      if (!randomGenre) {
        throw new Error("No Genre Available");
      }
      await recommendBook(randomGenre);
    } catch (error) {
      console.error("Error while fetching a random book", error);
    }
  };

  useEffect(() => {
    // Fetch books when user logs in
    if (isLoggedIn) fetchBooks();
    // Fetch books every 20 seconds
    const fetchBooksInterval = setInterval(async () => {
      if (isLoggedIn) await fetchBooks();
    }, 20000);
    // Clear books and recommendation when user logs out
    if (!isLoggedIn) {
      setBooks([]);
      setRecommendation(null);
    }

    // Clear interval when Context unmounts
    return () => clearInterval(fetchBooksInterval);
  }, [isLoggedIn, fetchBooks]);

  return (
    <BookContext.Provider
      value={{
        // States
        books,
        recommendation,
        // Functions
        setBooks,
        fetchBooks,
        addBook,
        deleteBook,
        handleRecommend,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

BookContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
