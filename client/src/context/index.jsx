import PropTypes from "prop-types";
import { AuthContextProvider } from "./AuthContext";
import { BookContextProvider } from "./BookContext";

const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <BookContextProvider>{children}</BookContextProvider>
    </AuthContextProvider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
