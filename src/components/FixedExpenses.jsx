import React, { useContext, useState } from "react";
import { SessionContext } from "../contexts/session.context";

function FixedExpenses({ setFinances }) {
  const { user, token } = useContext(SessionContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(user, "user payload");
      const response = await fetch("http://localhost:5005/finances", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ expenses: expenses, user: user._id }),
      });

      const parsed = await response.json();
      setFinances(parsed);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { key: "", value: "" }]);
  };

  const handleExpenseChange = (index, key, value) => {
    const newExpenses = [...expenses];
    newExpenses[index] = { key: key, value: value };
    setExpenses(newExpenses);
    console.log(expenses);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {expenses.map((expense, index) => (
          <div key={index}>
            <input
              type="text"
              value={expense.key}
              placeholder="What is your fixed expense?"
              onChange={(event) =>
                handleExpenseChange(index, event.target.value, expense.value)
              }
            />
            <input
              type="number"
              placeholder="Value"
              value={expense.value}
              onChange={(event) =>
                handleExpenseChange(index, expense.key, event.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={handleAddExpense}>
          Add expense
        </button>
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default FixedExpenses;
