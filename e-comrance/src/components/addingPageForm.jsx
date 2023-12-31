import React, { useState } from "react";
import { Form, Input, Button, Tag, Select } from "antd";
import { Adding } from "../services/Services";
import { useDispatch } from "react-redux";
import { addNotification } from "../../reducer/notificationReducer.js";
import { appendlisting } from "../../reducer/listingReducer.js";
import { v4 as uuidv4 } from "uuid";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";
import CountriesData from "./../../Data/countryData";
import categoriesWithOptions from "./../../Data/categoryData";

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

const AddingPageForm = ({
  setLoading,
  props,
  setCategory,
  setDescription,
  setName,
  setSelectedFile,
  setCountry,
  setPrice,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currencyCode = "EUR";

  const handleAdding = async () => {
    try {
      const id = uuidv4();
      setLoading(true);
      const newObject = {
        name: props.name,
        country: props.country,
        price: props.price,
        currency: currencyCode,
        category: props.category,
        description: props.description,
        pics: props.pics,
        id: id,
      };
      const response = await Adding(newObject);

      if (response.error) {
        setLoading(false);
        console.error("Adding failed", response.error);
        dispatch(addNotification(response.error));
      } else {
        setLoading(false);
        navigate("/");
        dispatch(appendlisting(response));
        console.log(response);
        dispatch(addNotification(`${response.name} was listed`));
        console.log("Navigoidaan");
      }
    } catch (error) {
      setLoading(false);
      console.error("Adding failed", error.message);
      dispatch(addNotification(error.message));
    }
  };

  const [form] = Form.useForm();

  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const base64 = reader.result;
      console.log(base64);
      setSelectedFile(base64);
    };
  };

  return (
    <Form
      form={form}
      style={{ padding: "30px", marginRight: "50px" }}
      layout="vertical"
      initialValues={{
        requiredMarkValue: true,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={
        requiredMark === "customize" ? customizeRequiredMark : requiredMark
      }
    >
      <Form.Item label="Product name" required>
        <Input
          type="text"
          placeholder="Product name"
          value={props.name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Product Country" required>
        <Select
          type="text"
          placeholder="Product Country"
          required
          options={CountriesData}
          filterOption={filterOption}
          value={props.country}
          onChange={(e) => setCountry(e)}
        />
      </Form.Item>
      <Form.Item label="Product Price" required>
        <Input
          type="text"
          placeholder="Product Price"
          value={props.price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Product Description" required>
        <TextArea
          type="text"
          placeholder="Product Description"
          value={props.description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Product Category" required>
        <Select
          type="text"
          placeholder="Product Category"
          options={categoriesWithOptions}
          value={props.category}
          onChange={(e) => setCategory(e)}
          required
        />
      </Form.Item>
      <Form.Item label="Product Image" required>
        <Input
          type="file"
          multiple
          onChange={(e) => convertToBase64(e)}
          required
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleAdding}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddingPageForm;
