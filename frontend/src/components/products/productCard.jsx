// src/components/products/ProductCard.jsx
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // ✅ Access Cart Context directly

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      className="relative bg-[#a1d788] dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)} // ✅ Add to Cart directly
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>


    </motion.div>
  );
};

export default ProductCard;
