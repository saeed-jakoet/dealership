// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page from './components/Page';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Page content="hero" />
      <Page content="about" />
      {/* <Page content="listings" />
      <Page content="contact" /> */}
      <Footer />
    </Router>
  );
}

export default App;

