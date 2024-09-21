import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BookContext } from "../context/BookContext";

const useAuth = () => useContext(AuthContext);
const useBook = () => useContext(BookContext);

export { useAuth, useBook };
