import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registery, updateStripeId } from "../services/Services";
import { Input, Button, Radio } from "antd";
import { Select } from "antd";
import countryData from "../../Data/countryData";

import "../styles/registeryStyles.css";

const Registerypage = () => {
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
  const [banking, setBanking] = useState(false);
  const [iban, setIban] = useState("");

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
      console.error("Registration failed:", error.message);
    }
  };
  const options = [
    {
      label: "Buy",
      value: "buyer",
    },
    {
      label: "Sell",
      value: "seller",
    },
    {
      label: "Both",
      value: "both",
    },
  ];

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleNext = () => {
    setBanking((prev) => !prev);
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
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="number"
              placeholder="Birthday"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="number"
              placeholder="Birth month"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="number"
              placeholder="Birth year"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            />
          </div>
          <div>
            <Select
              style={{ width: 300 }}
              id="input"
              showSearch
              placeholder="Select your country"
              options={countryData}
              onChange={(e) => setSelectedCountry(e)}
              filterOption={filterOption}
              value={selectedCountry}
              required
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>What you want to do?</p>
          <div>
            <Radio.Group
              id="input"
              options={options}
              onChange={(e) => setStyle(e.target.value)}
              value={style}
              optionType="button"
            />
          </div>
          <Button id="button" type="primary" onClick={handleNext}>
            Next
          </Button>
          <div>
            {banking && (
              <div>
                <p>
                  You can change your profile style later on your profile page
                </p>
                <div>
                  <Input
                    style={{ width: 300 }}
                    id="input"
                    type="text"
                    placeholder="IBAN"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                  />
                  <Button id="button" type="primary" htmlType="submit">
                    Register
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerypage;
