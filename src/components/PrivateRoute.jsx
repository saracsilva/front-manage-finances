import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/session.context";

const PrivateRoute = ({ children }) => {
  const { authenticateUser } = useContext(SessionContext);

  return authenticateUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
