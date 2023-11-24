import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
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

  console.log(user);
  console.log("user[0]", user && user[0] && user[0].name);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      Welcome back {user && user[0] && user[0].name} <FaHome />
    </div>
  );
};

export default Homepage;
