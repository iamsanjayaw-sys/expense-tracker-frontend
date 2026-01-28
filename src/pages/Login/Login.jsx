import { useState } from "react";
import Card from "../../components/Card/Card";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      data
    );
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="page-center">
      <Card>
        <h2>Welcome Back</h2>
        <TextField label="Email" name="email" onChange={(e)=>setData({...data,email:e.target.value})} />
        <TextField label="Password" type="password" name="password" onChange={(e)=>setData({...data,password:e.target.value})} />
        <Button text="Login" onClick={login} />
      </Card>
    </div>
  );
}
