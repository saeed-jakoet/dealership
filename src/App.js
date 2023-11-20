import React from 'react'
import Navbar from'./components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Listings from './components/Listings'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Listings />
    </div>
  );
}

export default App;
