import { useState, useEffect } from "react";
import Navbar from "./../components/navbar.jsx";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { getUserData, updateUserInfo, userDelete } from "../services/Services";
import { addNotification } from "../../reducer/notificationReducer.js";
import { useNavigate } from "react-router-dom";
import AdditionalInfo from "../components/registery/additionalInfo.jsx";
import AddressInfo from "../components/registery/addressInfo.jsx";
import PersonalInfo from "../components/registery/personalInfo.jsx";
import Spinner from "../components/LoadSpinner.jsx";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { setUser } from "../../reducer/userReducer.js";
import UserNavbar from "../components/userNavbar.jsx";
import PasswordChange from "../components/PasswordChangeCard.jsx";

const Userpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState(true);
  const [addressInfo, setAddressInfo] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVis, setPasswordVis] = useState(false);
  const [style, setStyle] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [Dob, setDob] = useState("");
  const [iban, setIban] = useState("");
  const [spinTip, setSpinTip] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("loggedNoteappUser"));
    setSpinTip("Loading user info...");
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserData(user);
        dispatch(setUser(response));
        console.log("response", response);
        setEmail(response.email);
        setFirstName(response.firstname);
        setLastName(response.lastname);
        setAddress(response.address || "");
        setPhone(response.phone || "");
        setStyle(response.style);
        setCity(response.city || "");
        setPostalCode(response.postalCode || "");
        setCountry(response.country || "");
        setPhone(response.phone || "");
        const splitted = response.Dob.split("/");
        const date = `${splitted[2]}-${splitted[0]}-${splitted[1]}`;
        console.log("date", date);
        setDob(date || "");
        setIban(response.iban || "");
        setLoading(false);
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          dispatch(addNotification("Please login to continue."));
        }
      }
    };
    fetchUser();
  }, []);

  const personalProps = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
  };

  const addressProps = {
    address,
    setAddress,
    city,
    setCity,
    country,
    setCountry,
    postalCode,
    setPostalCode,
  };

  const additionalProps = {
    phone,
    setPhone,
    iban,
    setIban,
    Dob,
    setDob,
    style,
    setStyle,
  };

  const handlePasswordVis = () => {
    setPasswordVis((prev) => !prev);
  };

  const handleUpdate = async () => {
    try {
      setSpinTip("Updating user info...");
      const newObject = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        style: style,
        country: country,
        city: city,
        address: address,
        postalCode: postalCode,
        phone: phone,
        Dob: Dob,
        iban: iban,
      };
      const response = await updateUserInfo(newObject);
      dispatch(addNotification(response));
      console.log(response);
    } catch (error) {
      console.error(error.error);
      dispatch(addNotification(error.error));
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
    <div className="App">
      <div>
        <Navbar />
        <h1>Userpage</h1>
        <UserNavbar
          handleShowAdditionalInfo={handleShowAdditionalInfo}
          handleShowAddressInfo={handleShowAddressInfo}
          handleShowPersonalInfo={handleShowPersonalInfo}
        />
        <div id="info-conteiner">
          {personalInfo && (
            <div>
              <PersonalInfo props={personalProps} />
            </div>
          )}
          {addressInfo && (
            <div>
              <AddressInfo props={addressProps} />
            </div>
          )}
          {additionalInfo && (
            <div>
              <AdditionalInfo props={additionalProps} />
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
            <Button type="primary" danger onClick={handleUserDelete}>
              Delete Account
            </Button>
          </div>
          <div style={{ margin: 10 }}>
            {passwordVis && (
              <PasswordChange setLoading={setLoading} setSpinTip={setSpinTip} />
            )}
          </div>
        </div>
      </div>
      <SpeedInsights />
      <Spinner loading={loading} spinTip={spinTip} />
    </div>
  );
};

export default Userpage;
