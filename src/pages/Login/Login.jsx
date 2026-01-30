import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        {/* LEFT */}
        <div className="signup-left">
          <h1>Sign In</h1>
          <p>
            Welcome back! <br />
            Please login to your account.
          </p>
        </div>

        {/* RIGHT */}
        <div className="signup-right">
          <h2>Welcome Back</h2>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signup-btn" onClick={handleLogin}>
            Sign In
          </button>

          <p className="login-text">
            Don’t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
