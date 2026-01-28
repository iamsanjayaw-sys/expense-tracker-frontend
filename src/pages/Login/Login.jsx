import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Popup from "../../components/Popup/Popup";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required ❗");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server error ❌");
      }
    }
  };

  return (
    <div className="login-container">
      <Card>
        <h2>Login</h2>

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button text="Login" onClick={handleLogin} />

        <p className="register-text">
          Don’t have an account?
          <span onClick={() => navigate("/")}> Register</span>
        </p>
      </Card>

      <Popup message={error} onClose={() => setError("")} />
    </div>
  );
};

export default Login;
