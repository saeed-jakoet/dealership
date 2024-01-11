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
      setCurrentImage((prevImage) =>
        prevImage < totalImages ? prevImage + 1 : 1
      );
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
    <Link to="about" smooth={true} duration={500}>
      <Element name="about" ref={aboutRef}>
        <motion.div
          className={`about ${isAboutVisible ? 'show' : ''}`}
          data-current-image={currentImage}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ ease: 'easeInOut', duration: 1 }}
        >
          <div id="about" className="content">
            <div
              className="parallax-bg-about"
              style={{
                transform: `translateY(${Math.max(
                  0,
                  (scrollPosition - window.innerHeight - 100) * 0.6
                )}px)`,
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
              We are a family-owned business rooted in two generations of
              experience in the automotive industry. Our collaborative efforts
              with renowned brands such as BMW, Audi, Mercedes-Benz, Toyota,
              Suzuki, Mazda, and Volkswagen have allowed us to develop optimal
              buying strategies and processes. As our valued client, you can
              expect not only competitive prices but also unparalleled service
              quality. At FARAUTO, we are committed to creating memorable
              experiences and fostering lasting relationships. We take pride in
              offering expert guidance to help you choose the right vehicle to
              meet your needs. Our comprehensive services include personalized
              vehicle financing options through major financial institutions,
              extensive warranty choices, and nationwide delivery for your
              convenience. Experience the difference with FARAUTO, where your
              automotive journey becomes our shared passion.
            </motion.p>
          </div>
        </motion.div>
      </Element>
    </Link>
  );
};

export default About;
