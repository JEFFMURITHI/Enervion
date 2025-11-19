import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Battery, Plug, Settings } from "lucide-react";

const iconMap = {
  "Battery Swapping": <Battery className="w-10 h-10 text-green-600 dark:text-green-400" />,
  "Repairs & Maintenance": <Wrench className="w-10 h-10 text-green-600 dark:text-green-400" />,
  "Installation & Consultation": <Plug className="w-10 h-10 text-green-600 dark:text-green-400" />,
  default: <Settings className="w-10 h-10 text-green-600 dark:text-green-400" />,
};

const ServiceItem = ({ service }) => {
  // ✅ Support both sample and DB data structures
  const { title, description, category, image, name } = service;

  const displayTitle = title || name || "Untitled Service";
  const displayCategory = category || "General";
  const displayDescription =
    description?.length > 120
      ? description.slice(0, 120) + "..."
      : description || "No description available.";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="w-full"
    >
      <Card
        className="overflow-hidden rounded-2xl border transition-all duration-500
          bg-[#a1d788] dark:bg-gray-800
          border-gray-100 dark:border-gray-700
          shadow-md hover:shadow-xl dark:hover:shadow-green-900/20"
      >
        {/* ✅ Image or Icon */}
        {image ? (
          <div className="h-52 w-full overflow-hidden">
            <img
              src={image}
              alt={displayTitle}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 bg-green-50 dark:bg-green-900/20 transition-colors duration-500">
            {iconMap[displayCategory] || iconMap.default}
          </div>
        )}

        {/* ✅ Content */}
        <CardContent className="p-6 text-center transition-colors duration-500">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {displayTitle}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-3">
            {displayDescription}
          </p>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium
              bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400
              transition-colors duration-500"
          >
            {displayCategory}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceItem;
