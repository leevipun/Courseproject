import { Input, Select, Tag, Form } from "antd";
import CountriesData from "../../../Data/countryData";
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

const AddressInfo = ({
  city,
  setCity,
  address,
  setAddress,
  postalCode,
  setPostalCode,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [form] = Form.useForm();

  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
        label="Country"
        required
        tooltip="If your country is not on the list Stripe does not yet support it"
      >
        <Select
          placeholder="Country"
          showSearch
          options={CountriesData}
          onChange={(e) => setSelectedCountry(e)}
          filterOption={filterOption}
          value={selectedCountry}
        />
      </Form.Item>
      <Form.Item label="Address" required>
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="City" required>
        <Input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Postal code" required>
        <Input
          type="text"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </Form.Item>
    </Form>
  );
};

export default AddressInfo;
