// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import NewsletterSignup from "../forms/NewsletterSignup";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#000B1A] dark:bg-gray-900  py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
        {/* Company Info */}
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600 dark:text-gray-300 font-semibold">
            &copy; {new Date().getFullYear()} Enervion. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"><Facebook size={20} /></a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"><Twitter size={20} /></a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com/in/jeff-murithi-15aa52226" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Home</Link>
          <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Products</Link>
          <Link to="/services" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Services</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">About</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">Contact</Link>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <h4 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">Subscribe to our Newsletter</h4>
          <NewsletterSignup />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
