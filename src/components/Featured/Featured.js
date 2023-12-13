// Featured.js
import React, { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import { motion } from 'framer-motion';
import './Featured.css';

const Featured = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link to='featured' smooth={true} duration={500}>
      <Element name='featured'>
        <div id='featured' className='featured'>
          <div id='about' className='content'>
            <div className='parallax-bg-featured' style={{
              transform: `translateY(${Math.max(0, (scrollPosition - window.innerHeight - 1000) * 0.5)}px)`,
            }}></div></div>
          <div className='content'>
            <motion.h2 animate={{ y: 0 }} transition={{ ease: 'easeInOut', duration: 0.5 }}>
              Featured Cars Collection
            </motion.h2>
            <motion.p animate={{ y: 0 }} transition={{ ease: 'easeInOut', duration: 0.7 }}>
              Explore our handpicked selection of vintage and classic cars.
            </motion.p>
          </div>
        </div>
      </Element>
    </Link>
  );
};

export default Featured;
