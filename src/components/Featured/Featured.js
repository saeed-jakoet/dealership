// Featured.js
import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import './Featured.css';

import featuredImage from '../images/old.jpg';
import jaguar from '../images/2014 Jaguar F-Type 5.0 V8 S/Main.jpg'
import bmw from '../images/R 1 999 900 | 2023 BMW X7 xDrive40d M Sport For Sale/27333503.jpeg'
import gti from '../images/2014 VW Golf Gti 2.0 DSG/Main (1).jpg'

const CarCard = ({ name, make, model, price, imageUrl }) => (
  <div className='car-card' key={name}>
    <img src={imageUrl} alt={`Car ${name}`} />
    <div className='car-details'>
      <p>{name}</p>
      {/* Additional details or buttons can be added here */}
    </div>
  </div>
);


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
    <Element name='featured'>
      <Parallax
        blur={0}
        bgImage={featuredImage}
        bgImageAlt='featured'
        strength={scrollPosition * 0.3}
        style={{
          width: '99vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
        renderLayer={() => (
          <div className='overlay-featured'></div>
        )}
      >
        <div className='container-featured'>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <p>Welcome to the world of luxury cars at XYZ Motors. Explore our carefully curated selection of high-performance vehicles that redefine elegance and power.</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ ease: 'easeInOut', duration: 1.5 }}
            >
            </motion.div>
          </motion.div>

          {/* Additional Car Cards */}
          <div className='car-list'>
            <CarCard
              name='Jaguar'
              imageUrl={jaguar}
            />
            <CarCard
              name='BMW'
              imageUrl={bmw}
            />
            <CarCard
              name='Golf 7 GTI'
              imageUrl={gti}
            />
          </div>
        </div>
      </Parallax>
    </Element>
  );
};

export default Featured;
