import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setCountry,
  setMaxPrice,
  setMinPrice,
} from "../../reducer/filterReducer";
import { Button, Input, Select } from "antd";
import categoriesWithOptions from "../../Data/categoryData";
import CountriesData from "../../Data/countryData";

const FilterCard = ({ showFilter }) => {
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
    <div>
      {showFilter && (
        <div style={{ margin: 30 }}>
          <div style={{ margin: 10 }}>
            <label htmlFor="category">Filter by category: </label>
            <Select
              id="category"
              options={categoriesWithOptions}
              style={{ width: 200 }}
              value={filter.category}
              onChange={(value) => dispatch(setCategory(value))}
            ></Select>
          </div>
          <div style={{ margin: 10 }}>
            <label htmlFor="country">Filter by country: </label>
            <Select
              id="country"
              options={CountriesData}
              style={{ width: 200 }}
              value={filter.country}
              onChange={(value) => dispatch(setCountry(value))}
            ></Select>
          </div>
          <div style={{ margin: 10, width: 300 }}>
            <label htmlFor="minPrice">Min price: </label>
            <Input
              id="minPrice"
              placeholder="Min price"
              value={filter.minPrice}
              onChange={(e) => dispatch(setMinPrice(e.target.value))}
            />
          </div>
          <div style={{ margin: 10, width: 300 }}>
            <label htmlFor="maxPrice">Max price: </label>
            <Input
              id="maxPrice"
              onChange={(e) => dispatch(setMaxPrice(e.target.value))}
              value={filter.maxPrice}
              placeholder="Max price"
            />
          </div>
          <div style={{ margin: 10 }}>
            <Button type="primary" onClick={() => handleClearFilter()}>
              Clear filter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCard;
