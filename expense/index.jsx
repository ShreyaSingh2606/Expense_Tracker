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
    let newExpenses = [...expenses];
    newExpenses.push({
      title: title,
      amount: amount,
    });

    event.target.elements.title.value = "";
    event.target.elements.amount.value = "";

    setExpenses(newExpenses);
  };

  let handleDelete = (expenseToDelete) => {
    setExpenses(expenses.filter(item => item !== expenseToDelete));
  };

  return (
    <div className="container">
      <h1 className="main-title">💸Expense Tracker</h1>

      <input
        className="search-input"
        placeholder="Search expenses"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
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

      <ul className="expense-list">
        {expenses
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map((item) => (
            <li className="expense-item" key={item.title}>
              <div>
                <span className="item-title">{item.title}</span>
                {" - "}
                <span className="item-amount">&#8377;{item.amount} </span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
