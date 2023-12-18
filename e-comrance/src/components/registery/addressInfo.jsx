import React from "react";
import { Input, Select, Button } from "antd";
import CountriesData from "../../../Data/countryData";

const AddressInfo = ({
  city,
  setCity,
  address,
  setAddress,
  postalCode,
  setPostalCode,
  selectedCountry,
  setSelectedCountry,
  handleAddressInfoForm,
  handlePersonalInfoForm,
}) => {
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <div>
        <Select
          style={{ width: 300 }}
          id="input"
          showSearch
          placeholder="Select your country"
          options={CountriesData}
          onChange={(e) => setSelectedCountry(e)}
          filterOption={filterOption}
          value={selectedCountry}
          required
        />
      </div>
      <div>
        <Input
          style={{ width: 300 }}
          id="input"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          style={{ width: 300 }}
          id="input"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          style={{ width: 300 }}
          id="input"
          type="text"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>
      <Button type="primary" onClick={handleAddressInfoForm}>
        Next
      </Button>
      <Button type="primary" onClick={handlePersonalInfoForm}>
        Back
      </Button>
    </div>
  );
};

export default AddressInfo;
