import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../services/Services";
import "../styles/loginStyles.css";
import { Button, Input } from "antd";

const Loginpage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Login(email, password);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <div id="div">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <Input
            id="input"
            type="text"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="input"
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="primary" id="button" htmlType="submit">
            Log in
          </Button>
        </form>
        <div>
          <Button type="primary" id="button">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
