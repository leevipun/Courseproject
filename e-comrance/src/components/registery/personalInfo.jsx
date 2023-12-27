import { Input } from "antd";
import React from "react";

const PersonalInfo = ({
  firstName,
  setFirstName,
  lastName,
  setLastname,
  email,
  setEmail,
}) => {
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
    </div>
  );
};

export default PersonalInfo;
