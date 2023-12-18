import React from "react";
import { Input, Button } from "antd";

const AdditionalInfo = ({
  birthDay,
  setBirthDay,
  birthMonth,
  setBirthMonth,
  setBirthYear,
  birthYear,
  iban,
  setIban,
  phoneNumber,
  setPhoneNumber,
  handleAddressInfoForm,
  handleRegistery,
}) => {
  return (
    <div>
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
        <Input
          style={{ width: 300 }}
          id="input"
          type="text"
          placeholder="IBAN"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <Input
          style={{ width: 300 }}
          id="input"
          type="text"
          placeholder="IBAN"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleAddressInfoForm}>
        Back
      </Button>
      <Button onClick={handleRegistery}>Submit</Button>
    </div>
  );
};

export default AdditionalInfo;
