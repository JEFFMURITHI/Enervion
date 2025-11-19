// src/components/common/SectionHeader.jsx
import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      className="text-center mb-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
