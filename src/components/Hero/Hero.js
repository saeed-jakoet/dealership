import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <div id='hero' className='hero'>
      <motion.div
        className='content'
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
  );
};

export default Hero;
