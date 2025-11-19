// src/pages/ContactPage.jsx
import Hero from "../components/hero/Hero";
import ContactForm from "../components/forms/contactForm"; // ✅ Make sure the filename matches exactly
import SectionHeader from "../components/common/sectionHeader";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#79ccea] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <Hero
        title="Get in Touch"
        subtitle="We’re here to help. Contact us today!"
        bgImage="/assets/images/contact-hero.jpg"
      />

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-[#a1d788] dark:bg-gray-800 p-8 rounded-2xl shadow-md transition-colors duration-500">
          <SectionHeader title="Send Us a Message" subtitle="We respond promptly to all inquiries" />
          <ContactForm apiUrl={`${import.meta.env.VITE_API_URI}/api/contact`} />
        </div>

        {/* Contact Info (FULLY INTERACTIVE) */}
        <div className="space-y-6">
          <SectionHeader title="Our Contact Info" subtitle="Reach us through any of these channels" />

          <div className="space-y-4 text-gray-700 dark:text-gray-300">

            {/* EMAIL */}
            <motion.a
              href="mailto:jeffmurithi3@gmail.com"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:shadow-md dark:hover:bg-gray-700"
            >
              <Mail size={22} className="text-green-600" />
              <span className="font-medium">jeffmurithi3@gmail.com</span>
            </motion.a>

            {/* PHONE */}
            <motion.a
              href="tel:+254743717554"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:shadow-md dark:hover:bg-gray-700"
            >
              <Phone size={22} className="text-green-600" />
              <span className="font-medium">+254 743 717 554</span>
            </motion.a>

            {/* LOCATION / OPEN GOOGLE MAPS */}
            <motion.a
              href="https://www.google.com/maps/place/Nairobi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer hover:shadow-md dark:hover:bg-gray-700"
            >
              <MapPin size={22} className="text-green-600" />
              <span className="font-medium">Nairobi, Kenya</span>
            </motion.a>

            {/* SOCIAL ICONS */}
            <div className="flex space-x-5 mt-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="https://www.linkedin.com/in/jeff-murithi-15aa52226"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeader title="Our Location" subtitle="Find us on the map" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.12345!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDE3JzM1LjAiTiAzNsKwNDknMDIuMCJF!5e0!3m2!1sen!2ske!4v0000000000000"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="rounded"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;
