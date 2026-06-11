import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

let App = () => {
  let [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [],
  );
  let [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  let handleSubmit = (event) => {
    event.preventDefault();
    let title = event.target.elements.title.value;
    let amount = Number(event.target.elements.amount.value);

    let newExpense = {
      id: Date.now(),
      title: title,
      amount: amount,
    };

    setExpenses([...expenses, newExpense]);

    event.target.elements.title.value = "";
    event.target.elements.amount.value = "";
  };

  let handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  let total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container">
      <h1 className="main-title">💸Expense Tracker</h1>

      <input
        className="search-input"
        placeholder="Search expenses"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <form className="expense-form" onSubmit={handleSubmit}>
        <input placeholder="Enter Title" name="title" required />
        <input
          type="number"
          placeholder="Enter Amount"
          name="amount"
          required
          min={0}
        />
        <button className="add-btn">Add</button>
      </form>

      {expenses.length > 0 && (
        <div className="total">
          Total: <span>&#8377;{total}</span>
        </div>
      )}

      <ul className="expense-list">
        {expenses
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map((item) => (
            <li className="expense-item" key={item.id}>
              <div>
                <span className="item-title">{item.title}</span>
                {" - "}
                <span className="item-amount">&#8377;{item.amount}</span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
