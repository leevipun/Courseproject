import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";

const Homepage = () => {
  const user = useSelector((state) => {
    console.log(state);
    console.log("User state näyttää tältä", state.user);
    return state.user;
  });

  console.log(user);
  console.log("user[0]", user[0].name);
  console.log(user.name);

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      Welcome back {user[0].name} <FaHome />
    </div>
  );
};

export default Homepage;
