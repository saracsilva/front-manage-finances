import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/session.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(SessionContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await fetch(`http://localhost:5005/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const parsed = await response.json();
      await console.log("JWT token", parsed.authToken);
      storeToken(parsed.authToken);
      authenticateUser();
      navigate(`/dashboard`);
      if (parsed.status === 201) {
        authenticateUser();
        navigate(`/dashboard`);
      } else {
        setErrorMessage(parsed.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;
