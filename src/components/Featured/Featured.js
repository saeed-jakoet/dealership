import React, { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import './Featured.css';

import vw from '../images/2014 VW Golf Gti 2.0 DSG/Main (1).jpg';
import honda from '../images/R 1 999 900 | 2023 BMW X7 xDrive40d M Sport For Sale/27333500.jpeg';
import jaguar from '../images/2014 Jaguar F-Type 5.0 V8 S/Main.jpg';

const Featured = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [middleImageIndex, setMiddleImageIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getOpacity = (index) => {
    return index === middleImageIndex || isHovered ? 1 : 0.3;
  };


  const getTransform = (index) => {
    if (index === middleImageIndex && isHovered) {
      // Middle image is hovered, unzoom
      return 'scale(1)';
    } else if (index === middleImageIndex && !isHovered) {
      // Middle image, default zoom
      return 'scale(1.5)';
    } else if (index !== middleImageIndex && isHovered) {
      // Other image is hovered, unzoom
      return 'scale(1)';
    } else {
      // Other images, default zoom
      return 'scale(1)';
    }
  };

  const handleImageClick = (index) => {
    if (index === middleImageIndex && !isHovered) {
      // Default behavior: go to default (enlarge middle image)
      setMiddleImageIndex(index);
      setIsHovered(false);
    } else {
      // Click on hovered image: reset to default (enlarge middle image)
      setMiddleImageIndex(index);
      setIsHovered(false);
    }
  };

  const handleImageHover = () => {
    setIsHovered(true);
  };

  const handleImageLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link to='featured' smooth={true} duration={500}>
      <Element name='featured'>
        <div id='featured' className='featured'>
          <div
            id='parallax-bg'
            className='parallax-bg-featured'
            style={{
              transform: `translateY(${Math.max(0, (scrollPosition - window.innerHeight - 1150) * 0.5)}px)`,
            }}
          ></div>
          <div className='carousel-container-featured'>
            {[vw, honda, jaguar].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Vintage Car ${index + 1}`}
                className={`side-image ${index === middleImageIndex ? 'middle-image' : ''}`}
                onClick={() => handleImageClick(index)}
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
                style={{
                  opacity: getOpacity(index),
                  transform: getTransform(index),
                  zIndex: index === middleImageIndex ? 2 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </Element>
    </Link>
  );
};

export default Featured;
