import { Input, Radio } from "antd";
import React from "react";

const AdditionalInfo = ({
  iban,
  setIban,
  phoneNumber,
  setPhoneNumber,
  style,
  setStyle,
  setBirthDay,
  birthDay,
}) => {
  const options = [
    {
      label: "Buyer",
      value: "buyer",
    },
    {
      label: "Seller",
      value: "seller",
    },
    {
      label: "Both",
      value: "both",
    },
  ];

  const handleDateChange = (e) => {
    // Format the date to yyyy-mm-dd
    setBirthDay(e.target.value);
    console.log(e.target.value);
    // Update the state with the formatted date
  };

  console.log(birthDay);
  return (
    <div>
      <div>
        <Input
          style={{ width: 300 }}
          id="input"
          type="text"
          autoComplete="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Input type="date" value={birthDay} onChange={handleDateChange} />
      </div>
      <div>
        <Input
          id="personalLongInput"
          type="text"
          placeholder="IBAN"
          autoComplete="iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
        />
      </div>
      <div id="personalStyleDiv">
        <div>
          <p>What role you wanna take</p>
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
    </div>
  );
};

export default AdditionalInfo;
