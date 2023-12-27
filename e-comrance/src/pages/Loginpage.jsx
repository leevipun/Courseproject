import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "../services/Services";
import "../styles/loginStyles.css";
import { useDispatch } from "react-redux";
import { appendUser } from "../../reducer/userReducer";
import Services from "../services/Services";
import { addNotification } from "../../reducer/notificationReducer";
import LoginForm from "../components/loginForm.jsx";
import React from "react";
import { initializecart } from "../../reducer/cartReducer.js";
import { initializefavorite } from "../../reducer/favoriteReducer.js";

const Loginpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await Login(email, password);
      dispatch(appendUser(user));
      Services.setToken(user.token);
      window.sessionStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(user.token)
      );
      dispatch(initializecart());
      dispatch(initializefavorite());
      navigate("/");
      dispatch(addNotification("Welcome back"));
    } catch (error) {
      dispatch(addNotification(error.error));
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <LoginForm
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}
    />
  );
};

export default Loginpage;
