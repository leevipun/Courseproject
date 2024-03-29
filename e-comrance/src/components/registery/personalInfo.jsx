import { Input, Tag, Form } from "antd";
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

const PersonalInfo = ({ props }) => {
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
      <Form.Item label="First name" required>
        <Input
        style={{minWidth: 200}}
          id="personalInfoInput"
          type="text"
          placeholder="First name"
          value={props.firstName}
          onChange={(e) => props.setFirstName(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Last name" required>
        <Input
        style={{minWidth: 200}}
          id="personalInfoInput"
          type="text"
          placeholder="Last name"
          value={props.lastName}
          onChange={(e) => props.setLastname(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Email" required>
        <Input
          id="personalLongInput"
          type="text"
          placeholder="Email"
          autoComplete="email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          required
        />
      </Form.Item>
      {props.isReqistery && (
        <Form.Item label="Password" required>
          <Input.Password
            type="password"
            placeholder="Password"
            value={props.password}
            autoComplete="new-password"
            required
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default PersonalInfo;
