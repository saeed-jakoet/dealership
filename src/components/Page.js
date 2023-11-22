// Page.js
import React from 'react';
import Hero from './Hero';
import About from './About';
import Listings from './Listings';
import Contact from './Contact';

const Page = ({ content }) => {
  switch (content) {
    case 'hero':
      return <Hero />;
    case 'about':
      return <About />;
    case 'listings':
      return <Listings />;
    case 'contact':
      return <Contact />;
    default:
      return null;
  }
};

export default Page;
