import React, { createContext, useEffect, useState } from "react";
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

  const authenticateUser = async () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      const response = await fetch("http://localhost:5005/auth/verify", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const parsed = await response.json();
      console.log(parsed, "test");

      setIsLoggedIn(true);
      setIsLoading(false);
      setUser(parsed);
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    }
  };
  const removeToken = () => {
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };
  useEffect(() => {
    authenticateUser(); //  <==  ADD
  }, []);
  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {" "}
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
