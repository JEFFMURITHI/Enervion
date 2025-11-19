// src/pages/HomePage.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  ArrowRight,
  Zap,
  Car,
  Bike,
  Sun,
  Battery,
  Wrench,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { testimonials } from "../data/testimonials"; // imported from another file

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const testimonialRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && testimonialRef.current) {
        testimonialRef.current.scrollBy({
          left: testimonialRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollLeft = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({
        left: -testimonialRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({
        left: testimonialRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#79ccea] dark:bg-gray-700 transition-colors duration-300 min-h-screen">
      {/* ---------------------- Hero Section ---------------------- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/home-hero.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/70" />
        </div>

        <div className="container mx-auto px-4 z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">Powering the Future of Mobility</span>
            </motion.div>

            <h1 className="text-white mb-6 text-4xl md:text-5xl font-bold">
              Drive the Future with Clean Energy Solutions
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover cutting-edge electric vehicles, sustainable energy systems, and revolutionary battery technology. Join the movement towards a cleaner, greener tomorrow.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-white/10 text-white"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-green-700 text-white hover:bg-white/10"
                >
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ---------------------- Scroll Indicator (Animated Mouse) ---------------------- */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center text-white dark:text-green-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="mb-2 text-sm">Scroll down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* ---------------------- Overview Section ---------------------- */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center mb-16">
          <motion.h2 {...fadeInUp} className="mb-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            What We Offer
          </motion.h2>
          <motion.p {...fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive solutions for sustainable transportation and renewable energy
          </motion.p>
        </div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4"
        >
          {[
            { icon: Car, title: "Electric Vehicles", description: "Premium electric cars and trucks with cutting-edge technology and exceptional performance.", color: "blue" },
            { icon: Bike, title: "Electric Motorbikes", description: "High-performance electric motorcycles and scooters for urban and adventure riding.", color: "purple" },
            { icon: Sun, title: "Renewable Energy", description: "Solar panels, wind turbines, and battery storage systems for sustainable power.", color: "amber" },
            { icon: Battery, title: "Battery Swapping", description: "Quick and convenient battery exchange service at our nationwide network of stations.", color: "green" },
            { icon: Wrench, title: "Repair & Maintenance", description: "Expert service and maintenance to keep your vehicle running at peak performance.", color: "red" },
            { icon: Zap, title: "Accessories & Parts", description: "High-quality parts, chargers, and accessories for all your electric mobility needs.", color: "indigo" },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-[#a1d788] dark:bg-gray-900 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-green-200">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-${item.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------- Why Choose Enervion ---------------------- */}
      <section className="py-20 bg-[#79ccea] dark:bg-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Why Choose Enervion?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              We're committed to providing sustainable, innovative, and reliable solutions for clean energy and electric mobility.
            </p>

            <div className="space-y-4">
              {[
                "Industry-leading technology and performance",
                "Comprehensive warranty and support",
                "Nationwide service and battery swap network",
                "Sustainable and eco-friendly solutions",
                "Competitive pricing and financing options",
                "Expert consultation and installation",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/assets/images/why-choose.jpg"
              alt="EV Charging"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ---------------------- CTA Section ---------------------- */}
      <section className="py-24 bg-[#79ccea] dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-900 dark:text-green-400 text-3xl md:text-4xl mb-6 font-bold"
          >
            Ready to Make the Switch?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-700 dark:text-green-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who have already made the transition to sustainable energy and electric mobility.
          </motion.p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-green-600 dark:bg-gray-700 text-gray-800 hover:bg-white/10 dark:hover:bg-gray-600">
                Browse Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-green-700 dark:border-gray-400 text-gray-800 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------- Testimonials Section ---------------------- */}
      <section className="py-16 relative bg-[#79ccea] dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Real experiences from our satisfied customers
        </p>

        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-green-900 hover:bg-green-600/40 text-white rounded-full p-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-green-900 hover:bg-green-600/40 text-white rounded-full p-2"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <motion.div
          ref={testimonialRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth px-4 hide-scrollbar"
        >
          {testimonials.map((client, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-shrink-0 w-80 bg-[#a1d788] dark:bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-colors duration-300"
            >
              <img
                src={client.image}
                alt={client.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-green-500"
              />
              <p className="text-gray-600 dark:text-gray-300 mb-3 italic">
                “{client.feedback}”
              </p>
              <h4 className="text-green-600 dark:text-green-400 font-semibold">{client.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
