import React, { useState, useEffect } from "react";
import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";
import { Input, Button, Spin } from "antd";
import { updateUserInfo } from "../services/Services";

const Userpage = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user.length > 0) {
        const userData = user[0];
        setEmail(userData.email);
        setName(userData.name);
        setAddress(userData.address || "");
        setPhone(userData.phone || "");
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    const response = await updateUserInfo(email, name, address, phone);
    console.log(response);
  };

  if (loading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

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
      <Button type="primary" onClick={handleUpdate}>
        Save changes
      </Button>
    </div>
  );
};

export default Userpage;
