import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";
import { Input, Button } from "antd";
import { useState } from "react";

const Userpage = () => {
  const user = useSelector((state) => {
    console.log("User", state.user);
    return state.user;
  });
  console.log();
  const [email, setEmail] = useState(user[0].email);
  const [name, setName] = useState(user[0].name);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdate = () => {};

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1>Userpage</h1>
      <div style={{ margin: 10 }}>
        <label htmlFor="email">Email: </label>
        <Input
          id="email"
          style={{ width: 300 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ margin: 10 }}>
        <label htmlFor="name">Name: </label>
        <Input
          id="name"
          style={{ width: 300 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ margin: 10 }}>
        <label htmlFor="address">Address: </label>
        <Input
          id="address"
          style={{ width: 300 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div style={{ margin: 10 }}>
        <label htmlFor="phone">Phone: </label>
        <Input
          id="phone"
          style={{ width: 300 }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <Button type="primary">Save changes</Button>
    </div>
  );
};

export default Userpage;
