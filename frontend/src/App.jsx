// src/App.jsx
import { AnimatePresence, motion } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen scroll-hide  dark:bg-gray-900 transition-colors duration-300">
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ Animated route transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
         
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <AppRoutes />
        </motion.main>
      </AnimatePresence>

      {/* ✅ Footer always at the bottom */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
