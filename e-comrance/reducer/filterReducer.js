export const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export const minPriceReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MIN_PRICE":
      return action.payload;
    default:
      return state;
  }
};

export const setMinPrice = (minPrice) => {
  return {
    type: "SET_MIN_PRICE",
    payload: minPrice,
  };
};

export const maxPriceReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MAX_PRICE":
      return action.payload;
    default:
      return state;
  }
};

export const setMaxPrice = (maxPrice) => {
  return {
    type: "SET_MAX_PRICE",
    payload: maxPrice,
  };
};

export const countryReducer = (state = "None", action) => {
  switch (action.type) {
    case "SET_COUNTRY":
      return action.payload;
    default:
      return state;
  }
};

export const setCountry = (country) => {
  return {
    type: "SET_COUNTRY",
    payload: country,
  };
};

export const categoryReducer = (state = "None", action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

export const setCategory = (category) => {
  return {
    type: "SET_CATEGORY",
    payload: category,
  };
};
