const categories = [
  "None",
  "Electronics",
  "Appliances",
  "Home",
  "Books",
  "Clothing",
  "Children",
  "Sports",
  "Beauty",
  "Pets",
  "Renovation",
  "Garden And Wood Stain",
  "Toys And Games",
  "Smartphones",
  "Laptops",
  "Fragrances",
  "Skincare",
  "Groceries",
  "Home Decoration",
  "Furniture",
  "Tops",
  "Women's Dresses",
  "Women's Shoes",
  "Men's Shirts",
  "Men's Shoes",
  "Men's Watches",
  "Women's Watches",
  "Women's Bags",
  "Women's Jewellery",
  "Sunglasses",
  "Automotive",
  "Motorcycle",
  "Lighting",
];

// Transform the array into an array of objects with value and label properties
const categoriesWithOptions = categories.map((category) => ({
  value: category,
  label: category,
}));

export default categoriesWithOptions;
