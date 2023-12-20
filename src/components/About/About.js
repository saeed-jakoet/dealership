import React, { useState, useEffect, useRef } from 'react';
import { Element, Link } from 'react-scroll';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const totalImages = 4;
  const aboutRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage < totalImages ? prevImage + 1 : 1));
    }, 6000);

    const handleScroll = () => {
      const aboutSection = aboutRef.current;
      if (aboutSection) {
        const rectTop = aboutSection.offsetTop;
        const rectBottom = rectTop + aboutSection.clientHeight;

        setIsAboutVisible(rectTop < window.innerHeight && rectBottom >= 0);
        setScrollPosition(window.scrollY);

        // If the user manually tries to scroll past the about page, adjust the scroll position
        if (rectTop <= 0) {
          window.scrollTo({
            top: aboutSection.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link to='about' smooth={true} duration={500}>
      <Element name='about' ref={aboutRef}>
        <motion.div
          className={`about ${isAboutVisible ? 'show' : ''}`}
          data-current-image={currentImage}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ ease: 'easeInOut', duration: 1 }}
        >
          <div id='about' className='content'>
            <div className='parallax-bg-about'
              style={{
                transform: `translateY(${Math.max(0, (scrollPosition - window.innerHeight - 100) * 0.6)}px)`,
              }}
            ></div>
            <motion.h2
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
            >
              About Us
            </motion.h2>
            <motion.p
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.7 }}
            >
              We are a Family-Owned business spawning from two generations of knowledge and experience in the Motor industry. Working together with mega household brands, such as BMW, AUDI, MERCEDES, TOYOTA, SUZUKI, MAZDA and VW, we have collectively formulated the best buying strategies and processes that assure you as our client the best possible prices and more-so, unmatched service quality. We at FARAUTO endeavor to make your experience one to remember, as we pride ourselves on building lasting relationships. We offer knowledgeable advice on the right vehicle for your needs and service offerings, including individualized vehicle finance with all major financial institutions, excellent warranty options and countrywide delivery for your logistical co
            </motion.p>
          </div>
        </motion.div>
      </Element>
    </Link>
  );
};

export default About;
