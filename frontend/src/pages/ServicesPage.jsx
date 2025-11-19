import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceItem from "../components/services/serviceItem";
import sampleServices from "../data/sampleServices";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  // 🌄 Three sliding hero images
  const heroImages = [
    "/assets/images/services/services-hero1.jpg",
    "/assets/images/services/services-hero2.jpg",
    "/assets/images/services/services-hero3.jpg",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    "All",
    "Battery Swapping",
    "Repairs & Maintenance",
    "Installation & Consultation",
  ];

  // 🌐 Fetch services from backend
  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URI}/api/services`
        );
        const data = await res.json();
        const dbServices = Array.isArray(data)
          ? data
          : data.services || [];

        const merged = [
          ...sampleServices,
          ...dbServices.filter(
            (db) =>
              !sampleServices.some(
                (s) =>
                  s.title?.toLowerCase().trim() ===
                    db.title?.toLowerCase().trim() || s._id === db._id
              )
          ),
        ];

        if (isMounted) setServices(merged);
      } catch (err) {
        console.error("❌ Failed to fetch services:", err);
        if (isMounted) setServices(sampleServices);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredServices =
    category === "All"
      ? services
      : services.filter(
          (s) =>
            s.category?.toLowerCase().trim() === category.toLowerCase().trim()
        );

  return (
    <div className="bg-[#79ccea] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* 🌄 HERO SECTION WITH HORIZONTAL SLIDING IMAGES */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentHero}
            src={heroImages[currentHero]}
            alt="Services Hero"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow">
            Our Services
          </h1>
          <p className="text-white mt-3 text-lg md:text-xl">
            Battery Swapping, Repairs & Maintenance, Installation & Consultation
          </p>
        </div>
      </div>

      {/* 🧭 Category Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-8 transition-colors duration-300">
          Featured Services
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 
                ${
                  category === cat
                    ? "bg-green-600 text-white border-green-600 shadow-md"
                    : "border-gray-300 text-gray-700 hover:bg-green-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-green-900/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🛠️ Service Grid */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading services...
          </p>
        ) : filteredServices.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No services found in this category.
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              {filteredServices.map((service) => (
                <ServiceItem
                  key={service._id || service.id || service.title}
                  service={service}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default ServicesPage;
