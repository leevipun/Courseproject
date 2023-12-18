import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registery, updateStripeId } from "../services/Services";

import "../styles/registeryStyles.css";
import PersonalInfo from "../components/registery/personalInfo";
import AddressInfo from "../components/registery/addressInfo";
import AdditionalInfo from "../components/registery/additionalInfo";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer";

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
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [style, setStyle] = useState("buyer");
  const [selectedCountry, setSelectedCountry] = useState("FI");
  const [iban, setIban] = useState("");
  const [personalInfoForm, setPersonalInfoForm] = useState(true);
  const [addressInfoForm, setAddressInfoForm] = useState(false);
  const [additionalInfoFrom, setAdditionalInfoForm] = useState(false);

  const handleRegistery = async (e) => {
    e.preventDefault();

    try {
      await registery(
        email,
        firstName,
        lastName,
        password,
        selectedCountry,
        style
      );
      await updateStripeId(
        email,
        iban,
        firstName,
        lastName,
        city,
        address,
        postalCode,
        phoneNumber,
        birthDay,
        birthMonth,
        birthYear,
        selectedCountry
      );
      navigate("/login");
      setEmail("");
      setFirstName("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error.error);
      dispatch(addNotification(error.error));
    }
  };

  const handlePersonalInfoForm = () => {
    setPersonalInfoForm((prev) => !prev);
    setAddressInfoForm((prev) => !prev);
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
          )}
          {addressInfoForm && (
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
          )}
          {additionalInfoFrom && (
            <AdditionalInfo
              setBirthDay={setBirthDay}
              birthDay={birthDay}
              setBirthMonth={setBirthMonth}
              birthMonth={birthMonth}
              setBirthYear={setBirthYear}
              birthYear={birthYear}
              setIban={setIban}
              iban={iban}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              handleAddressInfoForm={handleAddressInfoForm}
              handleRegistery={handleRegistery}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Registerypage;
