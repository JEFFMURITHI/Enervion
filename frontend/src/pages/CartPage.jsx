// src/pages/CartPage.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import CheckoutFormModal from "../components/checkout/CheckoutFormModal";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  // Compute total price
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-[#79ccea] dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        🛒 Your Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4"
        >
          <ShoppingCart size={70} className="text-gray-400 dark:text-gray-500" />
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Browse our products and add your favorite items to the cart.
          </p>
          <Link
            to="/products"
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-5">
            {cartItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center bg-[#a1d788] dark:bg-gray-800 shadow-md hover:shadow-lg rounded-2xl overflow-hidden p-4 transition-all duration-300"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />

                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.category || "General"}
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#a1d788] dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4"
          >
            <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-3">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-green-600 dark:text-green-400">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="pt-5 space-y-3">
              <button
                onClick={clearCart}
                className="w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-2.5 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition font-medium"
              >
                Clear Cart
              </button>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <CheckoutFormModal
            cartItems={cartItems}
            total={total}
            clearCart={clearCart}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
