import AddBookForm from "../components/add-book-form";
import BookList from "../components/book-list";
import RecommendationSection from "../components/recommendation-section";
import { useAuth } from "../hooks";

const HomePage = () => {
  const { logOut } = useAuth();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8">Book Recommendation</h1>
        <button
          onClick={logOut}
          className="p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Log Out
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
          <AddBookForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Books</h2>
          <BookList />
        </div>
      </div>
      <RecommendationSection />
    </div>
  );
};

export default HomePage;
