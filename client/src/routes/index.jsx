import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import HomePage from "../pages/home";

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
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <RegisterPage />}
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
