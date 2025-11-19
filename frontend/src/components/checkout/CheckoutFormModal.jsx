// src/components/checkout/CheckoutFormModal.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const CheckoutFormModal = ({ cartItems, total, clearCart, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Use VITE_API_URI environment variable for backend
  const apiUrl = `${import.meta.env.VITE_API_URI}/api/orders`;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(apiUrl, {
        ...formData,
        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        totalPrice: total,
      });

      alert("✅ Order successfully placed!");
      console.log("Order saved:", res.data);

      if (clearCart) clearCart(); // safely clear cart
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl w-full max-w-lg relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Buyer Information
        </h2>

        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
          <input
            type="text"
            name="customerName"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border dark:bg-gray-700"
            required
            value={formData.customerName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="customerEmail"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg border dark:bg-gray-700"
            required
            value={formData.customerEmail}
            onChange={handleChange}
          />

          <input
            type="text"
            name="customerPhone"
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg border dark:bg-gray-700"
            required
            value={formData.customerPhone}
            onChange={handleChange}
          />

          <textarea
            name="customerAddress"
            placeholder="Delivery Address"
            className="w-full p-3 rounded-lg border dark:bg-gray-700"
            rows="3"
            required
            value={formData.customerAddress}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            {loading ? "Saving Order..." : "Submit Order"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutFormModal;
