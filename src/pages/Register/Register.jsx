import { useState } from "react";
import Card from "../../components/Card/Card";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/register", form);
    window.location.href = "/login";
  };

  return (
    <div className="page-center">
      <Card>
        <h2>Create Account</h2>
        <TextField label="Full Name" name="full_name" onChange={handleChange} />
        <TextField label="Email" name="email" onChange={handleChange} />
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button text="Register" onClick={submit} />
      </Card>
    </div>
  );
}
