import "./FloatingButton.css";

const FloatingButton = ({ onClick }) => (
  <button className="floating-btn" onClick={onClick}>
    ＋
  </button>
);

export default FloatingButton;
