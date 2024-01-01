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

const AddressInfo = ({ props }) => {
  const [form] = Form.useForm();

  console.log("Address info props", props);

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
          onChange={(e) => props.setSelectedCountry(e)}
          filterOption={filterOption}
          value={props.selectedCountry}
        />
      </Form.Item>
      <Form.Item label="Address" required>
        <Input
          type="text"
          placeholder="Address"
          value={props.address}
          onChange={(e) => props.setAddress(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="City" required>
        <Input
          type="text"
          placeholder="City"
          value={props.city}
          onChange={(e) => props.setCity(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Postal code" required>
        <Input
          type="text"
          placeholder="Postal code"
          value={props.postalCode}
          onChange={(e) => props.setPostalCode(e.target.value)}
          required
        />
      </Form.Item>
    </Form>
  );
};

export default AddressInfo;
