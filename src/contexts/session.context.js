import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

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
      if (response.status === 401) {
        // Token has expired, log the user out
        logOutUser();
        navigate("/");
        return;
      }
      const parsed = await response.json();

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
    localStorage.removeItem("date");
  };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
    navigate(`/`);
  };
  console.log(localStorage);
  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
