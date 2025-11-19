// src/utils/seedData.js

const products = [
  {
    name: "Enervion Electric Car Model X",
    category: "electric-vehicle",
    price: 35000,
    images: [
      "https://via.placeholder.com/300x200?text=Electric+Car+Model+X",
    ],
    description: "High-performance electric car with long-lasting battery and advanced features.",
    stock: 5,
  },
  {
    name: "Enervion Electric Motorbike ZX",
    category: "electric-motorbike",
    price: 1200,
    images: [
      "https://via.placeholder.com/300x200?text=Electric+Motorbike+ZX",
    ],
    description: "Eco-friendly motorbike with fast charging and robust performance.",
    stock: 10,
  },
  {
    name: "Solar Panel Kit 500W",
    category: "renewable-system",
    price: 800,
    images: [
      "https://via.placeholder.com/300x200?text=Solar+Panel+500W",
    ],
    description: "Complete solar panel kit for residential renewable energy solutions.",
    stock: 20,
  },
  {
    name: "EV Battery Replacement",
    category: "accessory",
    price: 500,
    images: [
      "https://via.placeholder.com/300x200?text=EV+Battery+Replacement",
    ],
    description: "High-capacity battery replacement for electric vehicles.",
    stock: 15,
  },
];

const services = [
  {
    title: "Battery Swapping Service",
    description: "Fast and convenient battery swapping for electric vehicles and motorbikes.",
    image: "https://via.placeholder.com/300x200?text=Battery+Swapping",
    category: "battery-swapping",
  },
  {
    title: "Repair & Maintenance",
    description: "Comprehensive repair and maintenance for EVs and motorbikes.",
    image: "https://via.placeholder.com/300x200?text=Repair+%26+Maintenance",
    category: "repair-maintenance",
  },
  {
    title: "Installation & Consultation",
    description: "Professional installation of renewable energy systems and expert consultations.",
    image: "https://via.placeholder.com/300x200?text=Installation+%26+Consultation",
    category: "installation-consultation",
  },
];

module.exports = { products, services };
