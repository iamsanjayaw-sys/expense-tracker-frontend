import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const { full_name, email, password } = formData;

    // frontend validation
    if (!full_name || !email || !password) {
      alert("All fields are required ❗");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      // backend should return token
      localStorage.setItem("token", res.data.token);

      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("User already registered ❗");
      } else {
        alert("Registration failed ❌");
      }
    }
  };

  return (
    <div className="register-container">
      <Card>
        <h2>Create Account</h2>

        <TextField
          label="Full Name"
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
        />

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

        <Button text="Register" onClick={handleRegister} />

        <p className="login-text">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </Card>
    </div>
  );
};

export default Register;
