import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <HomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
