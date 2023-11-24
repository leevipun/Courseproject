import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../services/Services";
import "../styles/loginStyles.css";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { appendUser } from "../../reducer/userReducer";
import Services from "../services/Services";

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Login(email, password);
      console.log("User Loginissa", user);
      dispatch(appendUser(user));
      console.log(user.token);
      Services.setToken(user.token);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
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
          <div id="login">
            <Button type="primary" id="button" htmlType="submit">
              Log in
            </Button>
            <p>Forgot password?</p>
          </div>
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
