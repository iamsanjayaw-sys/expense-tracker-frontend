import "./ExpenseCard.css";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="expense-card">
      <img
        src={
          expense.bill_image
            ? `http://localhost:3000/uploads/${expense.bill_image}`
            : "/no-image.png"
        }
        alt="bill"
      />

      <div className="details">
        <h3>Rs. {expense.amount}</h3>
        <p>{expense.reason}</p>
        <span>{new Date(expense.created_at).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ExpenseCard;
