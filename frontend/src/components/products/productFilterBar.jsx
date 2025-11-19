// src/components/products/ProductFilterBar.jsx
import { useState } from "react";

const categories = ["All", "Electric Vehicles", "Motorbikes", "Renewable Energy", "Accessories"];

const ProductFilterBar = ({ onFilter }) => {
  const [active, setActive] = useState("All");

  const handleFilter = (category) => {
    setActive(category);
    onFilter(category);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full font-medium transition ${
            active === cat ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default ProductFilterBar;
