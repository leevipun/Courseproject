import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Registerypage from "./Reqisterypage";
import { useState } from "react";
import { Login } from "../services/Services";

const Registery = () => <Registerypage />;

const Loginpage = ({ setUser }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    const user = await Login(username, password);
    console.log(user);
    setUser(user.token);
  };

  return (
    <BrowserRouter>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Log in</button>
      <div>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
      <Routes>
        <Route path="/register" element={<Registery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Loginpage;
