import { Input, Radio, Tag, Form } from "antd";
import React, { useState } from "react";

const customizeRequiredMark = (label, { required }) => (
  <>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </>
);

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
    {
      label: "Admin",
      value: "admin",
    },
  ];

  const handleDateChange = (e) => {
    // Format the date to yyyy-mm-dd
    setBirthDay(e.target.value);
    console.log(e.target.value);
    // Update the state with the formatted date
  };

  const [form] = Form.useForm();

  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  console.log(birthDay);
  return (
    <Form
      style={{ padding: "30px" }}
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: true,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={
        requiredMark === "customize" ? customizeRequiredMark : requiredMark
      }
    >
      <Form.Item
        label="Phone number"
        required
        tooltip="Please include the country code"
      >
        <Input
          id="personalLongInput"
          type="text"
          autoComplete="tel"
          placeholder="phonenumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="IBAN" required>
        <Input
          id="personalLongInput"
          type="text"
          placeholder="IBAN"
          autoComplete="iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Birthday" required>
        <Input
          type="date"
          id="personalInfoInput"
          value={birthDay}
          onChange={handleDateChange}
          required
        />
      </Form.Item>
      <Form.Item label="What role do you want to take?" required>
        <Radio.Group
          id="input"
          options={options}
          onChange={(e) => setStyle(e.target.value)}
          value={style}
          optionType="button"
          required
        />
      </Form.Item>
    </Form>
  );
};
export default AdditionalInfo;
