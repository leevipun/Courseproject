import React, { useState, useEffect } from "react";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Spin } from "antd";
import {
  changePassword,
  updateUserInfo,
  userDelete,
} from "../services/Services";
import { addNotification } from "../../reducer/notificationReducer";
import { useNavigate } from "react-router-dom";
import AdditionalInfo from "../components/registery/additionalInfo";
import AddressInfo from "../components/registery/addressInfo";
import PersonalInfo from "../components/registery/personalInfo";
import { set } from "mongoose";

const Userpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState(true);
  const [addressInfo, setAddressInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
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
        setFirstName(userData.firstname);
        setLastname(userData.lastname);
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
    try {
      const response = await updateUserInfo(email, name, address, phone);
      dispatch(addNotification(response));
      console.log(response);
    } catch (error) {
      console.error(error.error);
      dispatch(addNotification(error.error));
    }
  };

  const handlePasswordSave = () => {
    if (password === password2) {
      changePassword(password);
    } else {
      console.log("passwords do not match");
    }
  };

  const handleUserDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const response = await userDelete();
      navigate("/login");
      dispatch(addNotification(response));
    }
  };

  const handleShowPersonalInfo = () => {
    setPersonalInfo(true);
    setAddressInfo(false);
    setAdditionalInfo(false);
  };

  const handleShowAddressInfo = () => {
    setPersonalInfo(false);
    setAddressInfo(true);
    setAdditionalInfo(false);
  };

  const handleShowAdditionalInfo = () => {
    setPersonalInfo(false);
    setAddressInfo(false);
    setAdditionalInfo(true);
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
        <h1>Userpage</h1>
        <div>
          <ul id="usernavbar">
            <li id="usernavitem" onClick={handleShowPersonalInfo}>
              Personal Info
            </li>
            <li id="usernavitem" onClick={handleShowAddressInfo}>
              Address Info
            </li>
            <li id="usernavitem" onClick={handleShowAdditionalInfo}>
              Additional Info
            </li>
          </ul>
        </div>
        {personalInfo && (
          <div>
            <PersonalInfo
              lastName={lastName}
              setLastname={setLastname}
              firstName={firstName}
              setFirstName={setFirstName}
              email={email}
              setEmail={setEmail}
            />
          </div>
        )}
        {addressInfo && (
          <div>
            <AddressInfo />
          </div>
        )}
        {additionalInfo && (
          <div>
            <AdditionalInfo />
          </div>
        )}
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
    </div>
  );
};

export default Userpage;
