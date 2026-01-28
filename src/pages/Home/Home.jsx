import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";
import AddExpensePopup from "../../components/AddExpensePopup/AddExpensePopup";
import "./Home.css";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <header className="header">Expense Tracker</header>

      <div className="home-container">
        {expenses.length === 0 ? (
          <p className="no-expense">No expense found</p>
        ) : (
          expenses.map((e) => <ExpenseCard key={e.id} data={e} />)
        )}
      </div>

      <button className="add-btn" onClick={() => setShow(true)}>＋</button>

      <AddExpensePopup
        show={show}
        close={() => setShow(false)}
        refresh={load}
      />

      <footer className="footer">© 2026 Expense Tracker</footer>
    </>
  );
}
