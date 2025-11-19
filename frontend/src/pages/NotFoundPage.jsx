// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <motion.h1
        className="text-6xl font-bold text-green-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl text-gray-700 dark:text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-500 transition-colors"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
