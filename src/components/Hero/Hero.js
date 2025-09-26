import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaPlay, FaChevronDown } from 'react-icons/fa';
import heroImage1 from '../images/home1.jpg';
import heroImage2 from '../images/home2.jpg';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const images = [heroImage1, heroImage2];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const parallaxY = scrollY * 0.3;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <div className="absolute inset-0 -z-20">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `translateY(${parallaxY}px)` }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

      {/* Floating Elements */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-red/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-2xl"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6"
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
            className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Discover exceptional vehicles with transparent pricing, expert guidance, and unmatched service excellence.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
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

            <motion.button
              className="group flex items-center gap-3 px-6 py-4 text-white hover:text-brand-accent-gold transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-brand-accent-gold/20 transition-all duration-300">
                <FaPlay className="ml-1 text-sm" />
              </div>
              <span className="font-medium">Watch Story</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 flex items-center justify-center lg:justify-start gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { number: '500+', label: 'Premium Cars' },
              { number: '98%', label: 'Satisfaction' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          className="flex-1 relative max-w-lg mx-auto lg:max-w-none"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        >
          {/* Glass Card */}
          <div className="relative p-8 rounded-3xl bg-glass-gradient backdrop-blur-lg border border-white/10 shadow-glass overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-red via-brand-accent-gold to-brand-red opacity-20 animate-gradient bg-200% bg-pos-0"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-brand-red to-brand-accent-gold flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl font-bold text-white">🚗</span>
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-3">Premium Experience</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every vehicle in our collection is carefully selected and thoroughly inspected to ensure the highest quality standards.
              </p>
              
              {/* Feature badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Certified', 'Warranty', 'Service'].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full border border-white/20 text-white/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </section>
  );
};

export default Hero;
