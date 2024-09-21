import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? token : "";
  });

  const setAccessToken = (val) => {
    localStorage.setItem("token", val);
    setAccessTokenState(val);
  };

  const logOut = () => {
    localStorage.clear();
    setAccessTokenState(null);
  };

  const isLoggedIn = useMemo(
    () => (!accessToken || accessToken?.trim() === "" ? false : true),
    [accessToken]
  );

  return (
    <AuthContext.Provider
      value={{
        // States
        accessToken,
        isLoggedIn,
        // Functions
        setAccessToken,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
