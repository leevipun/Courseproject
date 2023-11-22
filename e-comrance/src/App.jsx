import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Loginpage from "./pages/Loginpage";
import "./App.css";

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
    <div className="App">
      <Navbar />
    </div>
  );
};

export default App;
