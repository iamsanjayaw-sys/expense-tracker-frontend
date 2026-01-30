import "./ExpenseCard.css";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="expense-card">
      <div className="expense-left">
        <h4>{expense.reason}</h4>
        <p>{new Date(expense.created_at).toLocaleDateString()}</p>
      </div>

      <div className="expense-right">
        <span className="amount">Rs. {expense.amount}</span>

        {expense.bill_image && (
          <img
            src={`http://localhost:3000/uploads/${expense.bill_image}`}
            alt="bill"
            className="bill-image"
          />
        )}
      </div>
    </div>
  );
};

export default ExpenseCard;
