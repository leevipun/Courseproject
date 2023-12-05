import React, { useState, useEffect } from "react";
import Navbar from "./../components/navbar";
import { useSelector } from "react-redux";
import { Input, Button, Spin } from "antd";
import {
  changePassword,
  updateUserInfo,
  userDelete,
} from "../services/Services";

const Userpage = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVis, setPasswordVis] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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

  const handlePasswordVis = () => {
    setPasswordVis((prev) => !prev);
  };

  const handleUpdate = async () => {
    const response = await updateUserInfo(email, name, address, phone);
    console.log(response);
  };

  const handlePasswordSave = () => {
    if (password === password2) {
      changePassword(password);
    } else {
      console.log("passwords do not match");
    }
  };

  const handleUserDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      userDelete();
    }
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
      <div>
        <Button type="primary" onClick={handleUpdate} style={{ margin: 10 }}>
          Save changes
        </Button>
        <Button
          type="primary"
          onClick={handlePasswordVis}
          style={{ margin: 10 }}
        >
          Change Password
        </Button>
      </div>
      <div style={{ margin: 10 }}>
        {passwordVis && (
          <form>
            <div>
              <div style={{ margin: 10 }}>
                <label htmlFor="password">Password: </label>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="new-password"
                  style={{ width: 300 }}
                />
              </div>
              <div style={{ margin: 10 }}>
                <label htmlFor="password2">Repeat Password: </label>
                <Input.Password
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  id="password2"
                  autoComplete="new-password"
                  style={{ width: 300 }}
                />
              </div>
              <Button type="primary" onClick={handlePasswordSave}>
                Save Password
              </Button>
            </div>
          </form>
        )}
      </div>
      <div style={{ margin: 10 }}>
        <Button type="primary" danger onClick={handleUserDelete}>
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Userpage;
