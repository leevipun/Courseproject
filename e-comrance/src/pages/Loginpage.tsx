import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Registerypage from "./Reqisterypage";

const Registery = () => <Registerypage />;

const Loginpage = () => {
  return (
    <BrowserRouter>
      <div>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>
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
