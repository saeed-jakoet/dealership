import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Page from './components/Page';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Page content="hero" />
      <Page content="about" />
      {/* <Page content="featured" /> */}
      <Page content="listings" />
      {/* <Page content="contact" /> */}
      <Footer />
    </Router>
  );
}

export default App;
