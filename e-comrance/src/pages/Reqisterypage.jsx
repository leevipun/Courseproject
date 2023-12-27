import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registery, updateStripeId } from "../services/Services";
import { v4 as uuidv4 } from "uuid";
import React from "react";

import "../styles/registeryStyles.css";
import PersonalInfo from "../components/registery/personalInfo.jsx";
import AddressInfo from "../components/registery/addressInfo.jsx";
import AdditionalInfo from "../components/registery/additionalInfo.jsx";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer";
import { Button, Input } from "antd";
import Spinner from "../components/LoadSpinner.jsx";

const Registerypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [style, setStyle] = useState("buyer");
  const [selectedCountry, setSelectedCountry] = useState("FI");
  const [iban, setIban] = useState("");
  const [personalInfoForm, setPersonalInfoForm] = useState(true);
  const [addressInfoForm, setAddressInfoForm] = useState(false);
  const [additionalInfoFrom, setAdditionalInfoForm] = useState(false);
  const [birthDay, setBirthDay] = useState("");
  const [loading, setLoading] = useState(false);

  const spinTip = "Creating account...";

  const handleRegistery = async (e) => {
    e.preventDefault();

    try {
      const id = uuidv4();
      const splitBirthday = birthDay.split("-");
      const formattedDate = `${splitBirthday[1]}/${splitBirthday[2]}/${splitBirthday[0]}`;
      const newObject = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        style: style,
        country: selectedCountry,
        id: id,
        city: city,
        address: address,
        postalCode: postalCode,
        phone: phoneNumber,
        Dob: formattedDate,
        iban: iban,
      };
      setLoading(true);
      await registery(newObject);
      await updateStripeId(newObject);
      setLoading(false);
      navigate("/login");
      setEmail("");
      setFirstName("");
      setPassword("");
    } catch (error) {
      setLoading(false);
      console.error("Registration failed:", error.error);
      dispatch(addNotification(error.error));
    }
  };

  const handlePersonalInfoForm = () => {
    setPersonalInfoForm((prev) => !prev);
    setAddressInfoForm((prev) => !prev);
  };

  const handleCancel = () => {
    navigate("/login");
  };

  const handleAddressInfoForm = () => {
    setAddressInfoForm((prev) => !prev);
    setAdditionalInfoForm((prev) => !prev);
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegistery}>
          {personalInfoForm && (
            <div>
              <PersonalInfo
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastname={setLastname}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                style={style}
                setStyle={setStyle}
                handlePersonalInfoForm={handlePersonalInfoForm}
              />
              <div>
                <Input.Password
                  type="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div id="NextBackButtonDiv">
                <Button type="primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" onClick={handlePersonalInfoForm}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {addressInfoForm && (
            <div>
              <AddressInfo
                city={city}
                setCity={setCity}
                address={address}
                setAddress={setAddress}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                handleAddressInfoForm={handleAddressInfoForm}
                handlePersonalInfoForm={handlePersonalInfoForm}
              />
              <div id="NextBackButtonDiv">
                <Button type="primary" onClick={handlePersonalInfoForm}>
                  Back
                </Button>
                <Button type="primary" onClick={handleAddressInfoForm}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {additionalInfoFrom && (
            <div>
              <AdditionalInfo
                birthDay={birthDay}
                setBirthDay={setBirthDay}
                setIban={setIban}
                iban={iban}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                handleAddressInfoForm={handleAddressInfoForm}
                handleRegistery={handleRegistery}
                setStyle={setStyle}
                style={style}
              />
              <div id="NextBackButtonDiv">
                <Button type="primary" onClick={handleAddressInfoForm}>
                  Back
                </Button>
                <Button onClick={handleRegistery} type="primary">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
        <Spinner loading={loading} spinTip={spinTip} />
      </div>
    </div>
  );
};

export default Registerypage;
