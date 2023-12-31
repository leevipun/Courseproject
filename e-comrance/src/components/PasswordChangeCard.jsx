import React from "react";
import { Form, Input, Button } from "antd";
import { changePassword } from "../services/Services";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer.js";

const PasswordChange = ({ setLoading, setSpinTip }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handlePasswordSave = async (values) => {
    try {
      console.log(values.password);
      setSpinTip("Changing password...");
      setLoading(true);
      const response = await changePassword(values.password);
      setLoading(false);
      dispatch(addNotification(response));
    } catch (error) {
      console.error("Error occurred while changing password:", error.error);
      dispatch(addNotification(error.error));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handlePasswordSave} style={{ padding: "30px" }}>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password autoComplete="new-password" style={{ width: 300 }} />
      </Form.Item>

      <Form.Item
        name="password2"
        label="Repeat Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please repeat your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("The two passwords do not match");
            },
          }),
        ]}
      >
        <Input.Password autoComplete="new-password" style={{ width: 300 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordChange;
