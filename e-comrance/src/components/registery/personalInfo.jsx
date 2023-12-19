import React from "react";
import { Input, Radio, Button } from "antd";

const PersonalInfo = ({
  firstName,
  setFirstName,
  lastName,
  setLastname,
  email,
  setEmail,
  password,
  setPassword,
  style,
  setStyle,
  handlePersonalInfoForm,
}) => {
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
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Input
          id="personalInfoInput"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          id="personalInfoInput"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          id="personalLongInput"
          type="text"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          id="personalPasswordInput"
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="personalStyleDiv">
        <div>
          <p>What you want to do?</p>
        </div>
        <div>
          <Radio.Group
            id="input"
            options={options}
            onChange={(e) => setStyle(e.target.value)}
            value={style}
            optionType="button"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button type="primary" onClick={handlePersonalInfoForm}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
