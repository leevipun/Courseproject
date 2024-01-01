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

const AdditionalInfo = ({ props }) => {
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
    props.setDob(e.target.value);
    console.log(e.target.value);
    // Update the state with the formatted date
  };

  const formattedDate = () => {
    if (props.Dob === undefined) return;

    const splitted = props.Dob.split("-");
    return `${splitted[0]}-${splitted[1]}-${splitted[2]}`;
  };

  const [form] = Form.useForm();

  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      id="form"
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
          value={props.phone}
          onChange={(e) => props.setPhone(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="IBAN" required>
        <Input
          id="personalLongInput"
          type="text"
          placeholder="IBAN"
          autoComplete="iban"
          value={props.iban}
          onChange={(e) => props.setIban(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Birthday" required>
        <Input
          type="date"
          id="personalInfoInput"
          value={formattedDate()}
          onChange={handleDateChange}
          required
        />
      </Form.Item>
      <Form.Item label="What role do you want to take?" required>
        <Radio.Group
          id="input"
          options={options}
          onChange={(e) => props.setStyle(e.target.value)}
          value={props.style}
          optionType="button"
          required
        />
      </Form.Item>
    </Form>
  );
};
export default AdditionalInfo;
