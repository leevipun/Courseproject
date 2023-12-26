import { Button, Input } from "@antd";

const LoginForm = ({
  handleLogin,
  handleRegister,
  setEmail,
  setPassword,
  email,
  password,
}) => {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
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
