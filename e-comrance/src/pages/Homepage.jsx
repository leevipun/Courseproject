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

  const listings = useSelector((state) => {
    return state.listings;
  });

  useEffect(() => {
    if (!user || user.length === 0 || user[0].name === undefined) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {});

  console.log(user);
  console.log("user[0]", user && user[0] && user[0].name);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      Welcome back {user && user[0] && user[0].name} <FaHome />
      <div>
        {listings.map((listing) => (
          <div key={listing.id}>
            <div>{listing.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
