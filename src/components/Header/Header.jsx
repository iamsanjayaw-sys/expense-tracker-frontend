import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>Expense Tracker</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
