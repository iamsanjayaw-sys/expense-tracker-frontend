import { useState } from "react";
import "./AddExpensePopup.css";
import api from "../../api/axios";

const AddExpensePopup = ({ closePopup, refresh }) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitExpense = async () => {
    if (!reason || !amount) {
      alert("Please enter reason and amount");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("reason", reason);
      fd.append("amount", amount);
      if (bill) fd.append("bill_image", bill);

      await api.post("/expenses", fd);

      refresh();
      closePopup();
    } catch (error) {
      console.error("Failed to add expense", error);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Add Expense</h3>

        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          autoFocus
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBill(e.target.files[0])}
        />

        <div className="popup-actions">
          <button onClick={closePopup} disabled={loading}>
            Cancel
          </button>

          <button onClick={submitExpense} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpensePopup;
