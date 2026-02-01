import { useEffect, useState } from "react";
import api from "../../api/axios";
import Header from "../../components/Header/Header";
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";
import AddExpensePopup from "../../components/AddExpensePopup/AddExpensePopup";
import "./Home.css";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const filteredExpenses = selectedDate
    ? expenses.filter(
        (e) =>
          new Date(e.created_at).toISOString().slice(0, 10) === selectedDate
      )
    : expenses;

  return (
    <>
      <Header />

      {/* DATE FILTER */}
      <div className="filter-bar">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="home-container">
  {filteredExpenses.length === 0 ? (
    <div className="empty-state">
      <p>📭 No expenses found for this date</p>
    </div>
  ) : (
    filteredExpenses.map((exp) => (
      <ExpenseCard key={exp.id} expense={exp} />
    ))
  )}
</div>


      <button className="add-btn" onClick={() => setShowPopup(true)}>
        +
      </button>

      {showPopup && (
        <AddExpensePopup
          closePopup={() => setShowPopup(false)}
          refresh={loadExpenses}
        />
      )}
    </>
  );
};

export default Home;
