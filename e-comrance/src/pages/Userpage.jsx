import React, { useState, useEffect } from "react";
import Navbar from "./../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "antd";
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
import Spinner from "../components/LoadSpinner";

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
  const [style, setStyle] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [spinTip, setSpinTip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user.length > 0) {
        setSpinTip("Loading user info...");
        const userData = user[0];
        console.log(userData);
        setEmail(userData.email);
        setFirstName(userData.firstname);
        setLastname(userData.lastname);
        setAddress(userData.address || "");
        setPhone(userData.phone || "");
        setStyle(userData.style);
        setCity(userData.city || "");
        setPostalCode(userData.postalcode || "");
        setCountry(userData.country || "");
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
      setSpinTip("Updating user info...");
      const response = await updateUserInfo(email, name, address, phone, style);
      dispatch(addNotification(response));
      console.log(response);
    } catch (error) {
      console.error(error.error);
      dispatch(addNotification(error.error));
    }
  };

  const handlePasswordSave = () => {
    if (password === password2) {
      setSpinTip("Changing password...");
      setLoading(true);
      changePassword(password);
      setLoading(false);
    } else {
      console.log("passwords do not match");
    }
  };

  const handleUserDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      setSpinTip("Deleting account...");
      setLoading(true);
      const response = await userDelete();
      navigate("/login");
      dispatch(addNotification(response));
      setLoading(false);
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

  return (
    <div>
      <div>
        <Navbar />
        <h1>Userpage</h1>
        <div id="userPageDiv">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "aqua",
            }}
          >
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
                password={password}
                setPassword={setPassword}
              />
            </div>
          )}
          {addressInfo && (
            <div>
              <AddressInfo
                city={city}
                setCity={setCity}
                address={address}
                setAddress={setAddress}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                selectedCountry={country}
                setSelectedCountry={setCountry}
              />
            </div>
          )}
          {additionalInfo && (
            <div>
              <AdditionalInfo />
            </div>
          )}
          <div>
            <Button
              type="primary"
              onClick={handleUpdate}
              style={{ margin: 10 }}
            >
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
        <Spinner loading={loading} spinTip={spinTip} />
      </div>
    </div>
  );
};

export default Userpage;
