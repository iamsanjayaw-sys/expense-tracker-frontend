import "./Popup.css";

export default function Popup({ show, message, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
