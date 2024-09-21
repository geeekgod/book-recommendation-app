import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import { useAuth } from "../hooks";

const AppRouter = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
