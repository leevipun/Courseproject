import { FaUser } from "react-icons/fa";
import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";
import { Input, Button } from "antd";

const Userpage = () => {
  const user = useSelector((state) => {
    console.log("User", state.user);
    return state.user;
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1>Userpage</h1>
      <div style={{ margin: 10 }}>
        <label htmlFor="email">Email: </label>
        <Input id="email" style={{ width: 300 }} value={user[0].email} />
      </div>
      <div style={{ margin: 10 }}>
        <label htmlFor="name">Name: </label>
        <Input id="name" style={{ width: 300 }} value={user[0].name} />
      </div>
      <div style={{ margin: 10 }}>
        <label htmlFor="address">Address: </label>
        <Input id="address" style={{ width: 300 }} value={user[0].address} />
      </div>
      <div style={{ margin: 10 }}>
        <label htmlFor="phone">Phone: </label>
        <Input id="phone" style={{ width: 300 }} value={user[0].phone} />
      </div>
      <Button type="primary">Save changes</Button>
    </div>
  );
};

export default Userpage;
