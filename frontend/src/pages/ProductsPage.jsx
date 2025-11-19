import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/products/productCard";
import api from "../utils/api";
import { useCart } from "../context/CartContext"; // ✅ Import your Cart context

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { addToCart } = useCart();

  // 🌄 5 HERO IMAGES (Put them in public/assets/images/)
  const heroImages = [
    "/assets/images/products/products-hero.jpg",
    "/assets/images/products/products-hero2.jpg",
    "/assets/images/products/products-hero3.jpg",
    "/assets/images/products/products-hero4.jpg",
    "/assets/images/products/products-hero5.jpg",
  ];

  const [currentHero, setCurrentHero] = useState(0);

  // ⏳ Auto-change hero image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Categories list
  const categories = [
    "All",
    "Electric Vehicles",
    "Electric Motorbikes",
    "Electric Bikes",
    "Renewable Energy Systems",
    "Accessories & Parts",
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      category === "All" ||
      p.category?.toLowerCase().trim() === category.toLowerCase().trim();
    const matchesSearch = p.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#79ccea] dark:bg-gray-900 min-h-screen transition-colors duration-300">

      {/* 🌄 HERO SECTION WITH AUTO-CHANGING IMAGES */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentHero}
            src={heroImages[currentHero]}
            alt="Products Hero"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow">
            Our Products
          </h1>
          <p className="text-white mt-3 text-lg md:text-xl">
            Explore our electric vehicles, motorbikes, renewable systems, and accessories
          </p>
        </div>
      </div>

      {/* 🧭 Search + Category */}
      <section className="max-w-7xl mx-auto px-4 py-10 transition-colors duration-300">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-8">
          Featured Products
        </h2>

        {/* Search & Category */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300 w-64"
          />

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors duration-300"
            >
              Product Categories
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={showDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setShowDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        category === cat
                          ? "bg-green-600 text-white"
                          : "text-gray-800 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 🛒 Product Grid */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No products found in this category.
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={category + searchTerm}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;
