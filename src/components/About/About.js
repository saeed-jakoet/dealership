// About.js
import React, { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import './About.css';

const About = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const totalImages = 4;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage < 4 ? prevImage + 1 : 1));
    }, 6000);

    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsAboutVisible(rect.top < window.innerHeight && rect.bottom >= 0);
        setScrollPosition(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleImageChange = (direction) => {
    if (direction === 'prev') {
      setCurrentImage((prevImage) => (prevImage > 1 ? prevImage - 1 : totalImages));
    } else {
      setCurrentImage((prevImage) => (prevImage < totalImages ? prevImage + 1 : 1));
    }
  };

  return (
    <Element name='about'>

      <motion.div
        className={`about ${isAboutVisible ? 'show' : ''}`}
        data-current-image={currentImage}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ ease: 'easeInOut', duration: 1 }}
      >
        <div id='about' className='content'>
          <div className='parallax-bg-about' style={{
            transform: `translateY(${Math.max(0, (scrollPosition - window.innerHeight) * 0.6)}px)`,
          }}></div>
          <motion.h2 initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ ease: 'easeInOut', duration: 0.5 }}>
            Your Automotive Journey Begins Here
          </motion.h2>
          <motion.p initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ ease: 'easeInOut', duration: 0.7 }}>
            Discover the Excellence at FarAuto, your ultimate destination for premium vehicles.
          </motion.p>
          <motion.p initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ ease: 'easeInOut', duration: 0.9 }}>
            Our dedicated team is committed to providing you with a seamless car-buying experience.
          </motion.p>
          <motion.p initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ ease: 'easeInOut', duration: 1.1 }}>
            Explore the passion for quality and satisfaction with FarAuto, your trusted automotive partner.
          </motion.p>
          <Link to='listings' smooth={true} duration={500}>
            <motion.button
              className='showroom-button'
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ ease: 'easeInOut', duration: 1.3 }}
            >
              View Showroom
            </motion.button>
          </Link>
        </div>
        <div className='arrow left' onClick={() => handleImageChange('prev')}>
          <SlArrowLeft /> {/* Use the left arrow icon */}
        </div>
        <div className='arrow right' onClick={() => handleImageChange('next')}>
          <SlArrowRight /> {/* Use the right arrow icon */}
        </div>
      </motion.div>
    </Element>
  );
};

export default About;
