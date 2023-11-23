import { FaUser } from "react-icons/fa";
import Navbar from "./../components/navbar";
import UserNavbar from "./../components/userNavbar";

const Userpage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <UserNavbar />
      </div>
    </div>
  );
};

export default Userpage;
