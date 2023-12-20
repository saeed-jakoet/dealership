import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondImage(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const calculateBackgroundPosition = () => {
    // Adjust the background position based on the scroll position
    const yPos = -scrollY * 0; // You can adjust the parallax speed here
    return `center ${yPos}px`;
  };


  return (
    <div className="hero">
      <div className="image-container">
        <div
          className="left-half"
          style={{ backgroundPosition: calculateBackgroundPosition() }}
        ></div>
        {showSecondImage && (
          <motion.div
            className="right-half"
            initial={{ x: '100%' }} // Start off-screen
            animate={{ x: showSecondImage ? 0 : '100%' }} // Slide in based on state
            transition={{ ease: 'easeInOut', duration: 1 }}
            style={{
              backgroundImage: `url('../images/home2.jpg')`,
              backgroundPosition: calculateBackgroundPosition(), // Apply parallax effect
            }}
          />
        )}
      </div>
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ ease: 'easeInOut', duration: 1 }}
        >
          <motion.p initial={{ y: -300 }} animate={{ y: 0 }} transition={{ ease: 'easeInOut', duration: 0.5 }}>
            Your Dream Car Awaits
          </motion.p>
          <motion.h1 initial={{ y: -300 }} animate={{ y: 0 }} transition={{ ease: 'easeInOut', duration: 0.7 }}>
            Discover Luxury Beyond Limits
          </motion.h1>
          <motion.p initial={{ y: -300 }} animate={{ y: 0 }} transition={{ ease: 'easeInOut', duration: 0.9 }}>
            Indulge in the Extraordinary
          </motion.p>
          <motion.p initial={{ y: -300 }} animate={{ y: 0 }} transition={{ ease: 'easeInOut', duration: 1.1 }}>
            Find Your Perfect Car Today
          </motion.p>
          <Link to='listings' smooth={true} duration={500}>
            <motion.a
              className='button'
              style={{ display: 'inline-block', textDecoration: 'none' }}
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              transition={{ ease: 'easeInOut', duration: 1.3 }}
            >
              Explore Now
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
