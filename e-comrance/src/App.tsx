import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Loginpage from "./pages/Loginpage";
import User from "./../ftypes";

const App = () => {
  const [user, setUser] = useState("silja");

  if (!user || user.length === 0) {
    return (
      <div>
        <Loginpage />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
