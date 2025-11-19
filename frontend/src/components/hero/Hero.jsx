// src/components/hero/Hero.jsx
import { motion } from "framer-motion";

const Hero = ({ title, subtitle, ctaText, ctaLink, bgImage }) => {
  return (
    <section
      className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center text-white"
      style={{ background: `url(${bgImage}) center/cover no-repeat` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        className="relative z-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>

        {ctaText && ctaLink && (
          <motion.a
            href={ctaLink}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {ctaText}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
