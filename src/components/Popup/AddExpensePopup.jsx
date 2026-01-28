import { useState } from "react";
import axios from "axios";
import "./Popup.css";

const AddExpensePopup = ({ onClose, onAdded }) => {
  const [data, setData] = useState({
    amount: "",
    reason: "",
    bill_image: null,
  });

  const submit = async () => {
    const fd = new FormData();
    fd.append("amount", data.amount);
    fd.append("reason", data.reason);
    if (data.bill_image) fd.append("bill_image", data.bill_image);

    await axios.post(
      "http://localhost:3000/api/expenses/add",
      fd,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    onAdded();
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <input
          placeholder="Amount"
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />
        <input
          placeholder="Reason"
          onChange={(e) => setData({ ...data, reason: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) =>
            setData({ ...data, bill_image: e.target.files[0] })
          }
        />

        <button onClick={submit}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddExpensePopup;
