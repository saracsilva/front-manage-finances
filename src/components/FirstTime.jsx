import React, { useContext, useState } from "react";
import { SessionContext } from "../contexts/session.context";

function FirstTime({ setFinances }) {
  const { user } = useContext(SessionContext);
  const [totalValue, setTotalValue] = useState(0);
  const [fixedExpanses, setFixedExpanses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFixedExpanses([]);
      console.log(user, "user payload");
      const response = await fetch("http://localhost:5005/finances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalValue, fixedExpanses, user: user }),
      });

      const parsed = await response.json();
      setFinances(parsed);
      /*  if (response.status === 201) {
        console.log(parsed);
      } else {
        setErrorMessage(parsed.message);
      } */
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      {" "}
      <h1> First Time</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={totalValue}
          onChange={(event) => setTotalValue(event.target.value)}
          disabled={submitted}
        />
        <button type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default FirstTime;
