import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setCountry,
  setMaxPrice,
  setMinPrice,
} from "../../reducer/filterReducer";
import { Button, Input, Select, Form } from "antd";
import categoriesWithOptions from "../../Data/categoryData";
import CountriesData from "../../Data/countryData";

const FilterCard = ({ showFilter }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleClearFilter = () => {
    console.log("Clear filter");
    dispatch(setCategory("None"));
    dispatch(setCountry("None"));
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
  };
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginRight: 30,
      }}
    >
      {showFilter && (
        <div>
          <Form
            id="form"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
            form={form}
            initialValues={{
              category: filter.category,
              country: filter.country,
              minPrice: filter.minPrice,
              maxPrice: filter.maxPrice,
            }}
          >
            {showFilter && (
              <div style={{ margin: 30 }}>
                <Form.Item name="category" label="Filter by category:">
                  <Select
                    options={categoriesWithOptions}
                    style={{ width: 200 }}
                  />
                </Form.Item>
                <Form.Item name="country" label="Filter by country:">
                  <Select options={CountriesData} style={{ width: 200 }} />
                </Form.Item>
                <Form.Item
                  name="minPrice"
                  label="Min price:"
                  style={{ margin: 10, width: 300 }}
                >
                  <Input placeholder="Min price" />
                </Form.Item>
                <Form.Item
                  name="maxPrice"
                  label="Max price:"
                  style={{ margin: 10, width: 300 }}
                >
                  <Input placeholder="Max price" />
                </Form.Item>
                <Form.Item style={{ margin: 10 }}>
                  <Button type="primary" onClick={handleClearFilter}>
                    Clear filter
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default FilterCard;
