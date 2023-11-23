import { Link } from "react-router-dom";
import { useState } from "react";
import { Login } from "../services/Services";
import "../styles/loginStyles.css";
import { Button, Input } from "antd";

const Loginpage = ({ setUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const user = await Login(email, password);
    console.log(user);
    setUser(user.token);
  };

  return (
    <div id="div">
      <div>
        <h1>Login</h1>
        <Input
          id="input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button type="primary" id="button" onClick={handleLogin}>
            Log in
          </Button>
          <Button type="primary" id="button">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
