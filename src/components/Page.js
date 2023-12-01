// Page.js
import React from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Featured from './Featured/Featured';
import Contact from './Contact/Contact';
import Listings from './Listings/Listings'

const Page = ({ content }) => {
  switch (content) {
    case 'hero':
      return <Hero />;
    case 'about':
      return <About />;
    case 'featured':
      return <Featured />;
    case 'contact':
      return <Contact />;
    case 'listings':
      return <Listings />
    default:
      return null;
  }
};

export default Page;
