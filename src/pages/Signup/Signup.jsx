import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import api from "../../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/register", {
        full_name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        {/* LEFT */}
        <div className="signup-left">
          <h1>Sign Up</h1>
          <p>
            Sign up to unlock exciting <br />
            experience with our services.
          </p>
        </div>

        {/* RIGHT */}
        <div className="signup-right">
          <h2>Lets Get Started</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Amy Jane"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

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

          <p className="terms">
            By continuing you agree to{" "}
            <span>Terms & Conditions</span> and{" "}
            <span>Privacy Policy</span>
          </p>

          <button className="signup-btn" onClick={handleSignup}>
            Create Account
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login now</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
