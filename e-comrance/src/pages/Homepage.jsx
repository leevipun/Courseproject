import { FaHome } from "react-icons/fa";
import Navbar from "./../components/navbar";

const Homepage = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      Home <FaHome />
    </div>
  );
};

export default Homepage;
