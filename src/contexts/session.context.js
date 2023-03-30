import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  return (
    <SessionContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken }}
    >
      {" "}
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
