import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { Sun, Moon, Menu, X, ShoppingCart } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-[#000B1A] dark:bg-gray-900 shadow z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 🌿 Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 dark:text-green-400"
        >
          Enervion
        </Link>

        {/* 🌐 Desktop Links */}
        <ul className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-green-600 border-b-2 border-green-600 dark:text-green-400"
                    : "text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 🌗 Theme Toggle & 🛒 Cart (Always Visible) */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartItems.length}
              </motion.span>
            )}
          </Link>

          {/* 📱 Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 ml-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#000B1A] dark:bg-gray-900 px-4 py-3 flex flex-col space-y-3 border-t border-gray-200 dark:border-gray-700"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
