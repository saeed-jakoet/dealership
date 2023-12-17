import React, { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    return index === middleImageIndex ? 'scale(1.5)' : 'scale(1)';
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

  const handleImageHover = (index) => {
    // Enlarge the hovered image
    setMiddleImageIndex(index);
    setIsHovered(true);
  };

  const handleImageLeave = () => {
    setIsHovered(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    afterChange: current => console.log('Current Slide:', current)
  };


  return (
    <Link to='featured' smooth={true} duration={500}>
      <Element name='featured'>
        <div id='featured' className='featured'>

          {/* New text section above the carousel */}
          <div className='featured-text'>
            <h1>Explore Our Exclusive Inventory</h1>
            <p>
              Discover the finest collection of vintage cars at our dealership.
              Our curated selection showcases the epitome of automotive craftsmanship.
              Find the perfect blend of style, performance, and luxury in our inventory.
            </p>
          </div>

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
                onMouseEnter={() => handleImageHover(index)}
                onMouseLeave={handleImageLeave}
                style={{
                  opacity: getOpacity(index),
                  transform: getTransform(index),
                  zIndex: index === middleImageIndex ? 2 : 1,
                }}
              />
            ))}

            <div className='mobile-slider'>
              <Slider {...sliderSettings}>
                {[vw, honda, jaguar].map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Vintage Car ${index + 1}`} className='side-image' />
                  </div>
                ))}
              </Slider>

            </div>
          </div>
        </div>
      </Element>
    </Link>
  );
};

export default Featured;
