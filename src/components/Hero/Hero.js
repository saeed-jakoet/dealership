import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import heroImage from '../images/home1.jpg';


const stats = [
  { number: '500+', label: 'Premium Cars' },
  { number: '98%', label: 'Satisfaction' },
  { number: '24/7', label: 'Support' },
];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ scale: 1, opacity: 0.9 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* Single Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

      {/* Centered Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 pt-36 pb-24">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/30 to-brand-accent-gold/30 backdrop-blur-sm border border-white/10 mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
          <span className="text-sm font-medium tracking-wide text-white/90">PREMIUM DEALERSHIP</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="block text-white">Drive Your</span>
          <span className="block bg-gradient-to-r from-brand-red via-brand-accent-gold to-brand-red bg-clip-text text-transparent animate-gradient bg-200% bg-pos-0">
            Dreams
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Discover exceptional vehicles with transparent pricing, expert guidance, and unmatched service excellence.
        </motion.p>

        {/* Action Button */}
        <motion.div
          className="mt-10 flex justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to='listings' smooth={true} duration={800}>
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-full font-semibold text-white shadow-2xl hover:shadow-brand-red/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-red-light to-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                Explore Collection
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Glassmorphic Stats Card */}
        <motion.div
          className="mt-16 mx-auto max-w-2xl w-full rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-glass flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center flex-1">
              <div className="text-3xl font-bold text-white drop-shadow-lg">{stat.number}</div>
              <div className="text-sm text-gray-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Link to='about' smooth={true} duration={800}>
            <motion.button
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium tracking-wide">Discover More</span>
              <FaChevronDown className="text-lg" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
