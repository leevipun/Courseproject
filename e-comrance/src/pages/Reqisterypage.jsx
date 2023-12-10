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
  const [name, setName] = useState("");
  const [style, setStyle] = useState("buyer");
  const [selectedCountry, setSelectedCountry] = useState("FI");

  const handleRegistery = async (e) => {
    e.preventDefault();

    try {
      await registery(email, name, password, selectedCountry, style);
      await updateStripeId(email, name, selectedCountry);
      navigate("/login");
      setEmail("");
      setName("");
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
              type="email"
              placeholder="Email"
              autoComplete="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              style={{ width: 300 }}
              id="input"
              type="text"
              placeholder="Name"
              autoComplete="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
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
          <p>Where are you from?</p>
          <div>
            <Select
              style={{ width: 200 }}
              showSearch
              defaultValue="Finaland"
              value={selectedCountry}
              filterOption={filterOption}
              onChange={(value) => setSelectedCountry(value)}
              options={countryData}
            ></Select>
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
          <Button id="button" type="primary" htmlType="submit">
            Register
          </Button>
          <div>
            <p>
              Fill the rest of the information in your profile after
              registration
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerypage;
