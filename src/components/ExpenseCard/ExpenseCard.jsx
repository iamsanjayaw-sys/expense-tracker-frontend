import "./ExpenseCard.css";

const ExpenseCard = ({ expense }) => {
  const hasBill = Boolean(expense.bill_image);

  const imageUrl = hasBill
    ? `http://localhost:3000/uploads/${expense.bill_image}`
    : "/no-bill.png"; // 🔥 from public folder

  return (
    <div className="expense-card">
      <div className="expense-image">
        <img src={imageUrl} alt="bill" />

        {!hasBill && (
          <div className="no-bill-badge">
            Bill not added
          </div>
        )}
      </div>

      <div className="expense-content">
        <h4>{expense.reason}</h4>
        <p className="date">
          {new Date(expense.created_at).toLocaleDateString()}
        </p>

        <div className="amount">
          Rs. {Number(expense.amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
