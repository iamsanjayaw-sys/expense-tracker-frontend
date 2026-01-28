import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import AddExpensePopup from "../../components/Popup/AddExpensePopup";

import "./Home.css";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [date, setDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const loadExpenses = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/expenses",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: date ? { date } : {},
      }
    );
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, [date]);

  return (
    <>
      <Header />

      <div className="filter">
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button onClick={() => setDate("")}>Clear</button>
      </div>

      <div className="expense-list">
        {expenses.length === 0 ? (
          <p>No data</p>
        ) : (
          expenses.map((e) => <ExpenseCard key={e.id} expense={e} />)
        )}
      </div>

      <FloatingButton onClick={() => setShowPopup(true)} />

      {showPopup && (
        <AddExpensePopup
          onClose={() => setShowPopup(false)}
          onAdded={loadExpenses}
        />
      )}
    </>
  );
};

export default Home;
