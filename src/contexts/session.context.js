import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  return <SessionContext.Provider></SessionContext.Provider>;
};

export { SessionContext, SessionProvider };
