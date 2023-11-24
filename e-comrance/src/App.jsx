import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => {
    console.log(state);
    console.log("User state näyttää tältä", state.user);
    return state.user;
  });

  useEffect(() => {
    if (!user || user.length === 0 || user[0].name === undefined) {
      navigate("/login");
    }
  }, []);
};

export default App;
