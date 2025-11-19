// src/components/services/ServiceList.jsx
import ServiceItem from "./ServiceItem";
import { motion } from "framer-motion";

const ServiceList = ({ services }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      {services.map((service) => (
        <ServiceItem key={service._id} service={service} />
      ))}
    </motion.div>
  );
};

export default ServiceList;
