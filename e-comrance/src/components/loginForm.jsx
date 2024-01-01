import { Button, Input } from "antd";
import React from "react";

const LoginForm = ({
  handleLogin,
  handleRegister,
  setEmail,
  setPassword,
  email,
  password,
}) => {
  const handleForgotPassword = () => {
    window.location.href = "/forgotpassword";
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div>
        <form id="form" onSubmit={handleLogin} style={{ marginTop: 100 }}>
          <h1 style={{ color: "#fcfbfc" }}>Login</h1>
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
            <p
              style={{ color: "#fcfbfc", cursor: "pointer" }}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </p>
          </div>
          <div>
            <Button type="primary" id="button" onClick={() => handleRegister()}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
