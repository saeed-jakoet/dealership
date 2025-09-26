import React from 'react';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import Listings from './Listings/Listings';
import Reviews from './Reviews';

const Page = ({ content }) => {
  switch (content) {
    case 'hero':
      return <Hero />;
    case 'about':
      return <About />;
    case 'contact':
      return <Contact />;
    case 'listings':
      return <Listings />;
      case 'reviews':
        return <Reviews />;
    default:
      return null;
  }
};

export default Page;
