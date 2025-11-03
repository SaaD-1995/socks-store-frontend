"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./home.css";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Step Into Comfort & Style",
    subtitle: "New Collection 2025",
    description:
      "Discover our premium collection of socks designed for every occasion. From athletic performance to everyday comfort.",
    image:
      "https://images.unsplash.com/photo-1651223658914-efd50e3da48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    bgGradient: "from-purple-50 via-pink-50 to-blue-50",
    buttonText: "Shop Now",
    badge: "Free Shipping Over $50",
  },
  {
    id: 2,
    title: "Performance Meets Style",
    subtitle: "Athletic Collection",
    description:
      "Engineered for athletes and active lifestyles. Maximum comfort, breathability, and durability in every step.",
    image:
      "https://images.unsplash.com/photo-1760177379331-a8b4311db4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    bgGradient: "from-orange-50 via-red-50 to-pink-50",
    buttonText: "Explore Athletic",
    badge: "Enhanced Performance",
  },
  {
    id: 3,
    title: "Cozy Winter Essentials",
    subtitle: "Winter Warmth",
    description:
      "Snuggle up with our ultra-soft, warm socks perfect for cold days. Luxury comfort for your feet.",
    image:
      "https://images.unsplash.com/photo-1731936757627-f2a1ea5893e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    bgGradient: "from-blue-50 via-cyan-50 to-teal-50",
    buttonText: "Shop Winter",
    badge: "Premium Materials",
  },
  {
    id: 4,
    title: "Express Your Style",
    subtitle: "Fashion Forward",
    description:
      "Bold patterns, vibrant colors, and unique designs. Make a statement with every outfit.",
    image:
      "https://images.unsplash.com/photo-1597194536284-140766201107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    bgGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
    buttonText: "View Collection",
    badge: "Limited Edition",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[90vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={`relative md:pt-0  py-9 bg-gradient-to-br ${slide.bgGradient} h-full flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20`}
                >
                  {/* Content */}
                  <div className="max-w-lg space-y-5">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`px-4 py-2 bg-gradient-to-r ${slide.gradient} text-white rounded-full text-sm shadow-md`}
                    >
                      {slide.subtitle}
                    </motion.span>

                    <motion.h1
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                      className="text-4xl md:text-5xl font-bold text-gray-900"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
                      className="text-gray-600 text-lg"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
                      className="flex gap-4 pt-4"
                    >
                      <button
                        className={`bg-gradient-to-r ${slide.gradient} hover:opacity-90 transition-all shadow-md w-auto flex items-center text-white px-5 py-3 rounded-lg font-semibold`}
                      >
                        {slide.buttonText}
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </button>
                      <button
                        className="border-2 hover:bg-white/50 w-auto flex items-center px-5 py-3 rounded-lg font-semibold text-gray-700 hover:text-gray-900 transition-all"
                      >
                        Learn More
                      </button>
                    </motion.div>
                  </div>

                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${slide.gradient} opacity-20`}
                    />
                    <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-xl">
                      <p
                        className={`text-sm font-semibold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                      >
                        {slide.badge}
                      </p>
                      <p className="text-xs text-gray-600">Special Offer</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
