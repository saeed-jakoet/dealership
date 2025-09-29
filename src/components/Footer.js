import React, { useRef } from "react";
import { Link } from "react-scroll";
import { motion, useInView } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaChevronUp,
  FaHeart,
} from "react-icons/fa";
import Logo from "../assets/images/logo4.png";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

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

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/far.auto_/",
      color: "hover:text-pink-400",
      bgGradient: "from-pink-500 to-orange-500",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/+27718740886",
      color: "hover:text-green-400",
      bgGradient: "from-green-500 to-green-600",
    },
    {
      name: "Phone",
      icon: FaPhone,
      href: "tel:+27835789437",
      color: "hover:text-blue-400",
      bgGradient: "from-blue-500 to-blue-600",
    },
  ];

  const quickLinks = [
    { name: "Home", target: "hero" },
    { name: "About", target: "about" },
    { name: "Showroom", target: "listings" },
    { name: "Contact", target: "contact" },
    { name: "Reviews", target: "reviews" },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: "fvrauto@gmail.com",
    },
    {
      icon: FaPhone,
      text: "+27 83 578 9437",
    },
    {
      icon: FaMapMarkerAlt,
      text: "The Studios, 1 Wild Olive Road, Sontraal, Cape Town,7550",
    },
  ];

  const businessHours = [
    "Monday - Thursday: 09:00 - 16:00",
    "Friday: 09:00 - 12:00 | 14:00 - 16:00",
    "Saturday: 09:00 - 13:00",
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-black via-brand-gray-dark to-black border-t border-white/10 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-red/5 to-brand-accent-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-brand-accent-gold/5 to-brand-red/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <img src={Logo} alt="FARAUTO Logo" className="h-12 w-auto" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">FARAUTO</h3>
                  <p className="text-sm text-brand-red font-medium">
                    Premium Dealership
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted partner for premium vehicles. We deliver excellence
                in automotive retail with personalized service and unmatched
                quality.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-red/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${social.bgGradient} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaChevronUp className="text-brand-red rotate-90" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <Link
                      to={link.target}
                      smooth={true}
                      duration={800}
                      className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-1 h-1 bg-brand-red rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaEnvelope className="text-brand-red" />
                Contact Info
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <info.icon className="text-brand-red mt-1 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{info.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Business Hours */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaClock className="text-brand-red" />
                Business Hours
              </h4>
              <ul className="space-y-3">
                {businessHours.map((hour, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-300 leading-relaxed"
                  >
                    {hour}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div className="mt-6">
                <Link to="contact" smooth={true} duration={800}>
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-xl text-white font-medium shadow-lg hover:shadow-brand-red/25 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get In Touch
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>
                  © {new Date().getFullYear()} FARAUTO. All rights reserved.
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaHeart className="text-brand-red mx-1" />
                </motion.div>
                <span>by RAMAF (PTY) LTD</span>
              </div>

              {/* Back to Top */}
              <Link to="hero" smooth={true} duration={800}>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronUp className="text-xs" />
                  <span>Back to Top</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-accent-gold to-brand-red opacity-50 animate-gradient bg-200% bg-pos-0" />
    </footer>
  );
};

export default Footer;
