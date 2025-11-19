// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner"; // Optional loading spinner component

// ✅ Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const CartPage = lazy(() => import("../pages/CartPage")); // ✅ Added cart page
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const AppRoutes = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <Spinner /> {/* Optional loading spinner */}
      </div>
    }
  >
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} /> {/* ✅ Added Cart Route */}
      <Route path="*" element={<NotFoundPage />} /> {/* Fallback 404 */}
    </Routes>
  </Suspense>
);

export default AppRoutes;
