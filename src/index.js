import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SessionProvider } from "./contexts/session.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <SessionProvider>
        <App />
      </SessionProvider>
    </Router>
  </React.StrictMode>
);
