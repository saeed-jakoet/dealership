import React, { useState, useRef } from "react";
import { Element } from "react-scroll";
import { motion, useInView } from "framer-motion";
import {
  FaAward,
  FaCar,
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaTruck,
} from "react-icons/fa";
import aboutImage1 from "../../components/images/about2.jpg";
import aboutImage2 from "../../components/images/about4.jpg";
import aboutImage3 from "../../components/images/darkf.jpg";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const images = [aboutImage1, aboutImage2, aboutImage3];

  const features = [
    {
      icon: FaAward,
      title: "Premium Quality",
      description: "Hand-selected vehicles meeting the highest standards",
    },
    {
      icon: FaCar,
      title: "Expert Curation",
      description: "Every vehicle thoroughly inspected by our specialists",
    },
    {
      icon: FaUsers,
      title: "Family Business",
      description: "Two generations of automotive excellence and trust",
    },
    {
      icon: FaShieldAlt,
      title: "Comprehensive Warranty",
      description: "Peace of mind with extensive coverage options",
    },
    {
      icon: FaHandshake,
      title: "Personalized Service",
      description: "Tailored solutions for your unique needs",
    },
    {
      icon: FaTruck,
      title: "Nationwide Delivery",
      description: "Convenient delivery to your doorstep anywhere",
    },
  ];

  const stats = [
    { number: "25+", label: "Years Experience" },
    { number: "500+", label: "Happy Customers" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Element name="about">
      <section
        ref={aboutRef}
        className="relative min-h-screen py-20 bg-gradient-to-b from-brand-gray-dark via-gray-900 to-black overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6"
            >
              <FaAward className="text-brand-red" />
              <span className="text-sm font-medium tracking-wide text-white/90">
                OUR STORY
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Built on{" "}
              <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Two generations of automotive passion, bringing you the finest
              vehicles with unmatched service and expertise.
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Your Automotive Journey, Our Passion
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We are a family-owned business rooted in two generations of
                  experience in the automotive industry. Our collaborative
                  efforts with renowned brands such as BMW, Audi, Mercedes-Benz,
                  Toyota, Suzuki, Mazda, and Volkswagen have allowed us to
                  develop optimal buying strategies and processes.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  At FARAUTO, we are committed to creating memorable experiences
                  and fostering lasting relationships. We take pride in offering
                  expert guidance to help you choose the right vehicle to meet
                  your needs.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-brand-red mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Main Image */}
                <div className="relative h-96 sm:h-[500px]">
                  {images.map((image, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    </motion.div>
                  ))}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Glass Effect */}
                  <div className="absolute inset-0 bg-glass-gradient backdrop-blur-[1px]" />
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-brand-red scale-125"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-brand-red/20 to-brand-accent-gold/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaCar className="text-3xl text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-brand-accent-gold/20 to-brand-red/20 rounded-full backdrop-blur-sm border border-white/10"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-brand-red/30 transition-all duration-500"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-red/20 to-brand-accent-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-2xl text-brand-red" />
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-accent-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-32 bg-gradient-to-b from-brand-red/30 to-transparent animate-pulse-slow" />
        <div
          className="absolute top-1/2 right-10 w-2 h-48 bg-gradient-to-b from-brand-accent-gold/30 to-transparent animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </section>
    </Element>
  );
};

export default About;
