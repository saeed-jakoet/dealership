// Navbar.js
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../images/logo4.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleClick = () => {
    setClick(!click);
    document.body.classList.toggle('no-scroll', !click);
  };
  
  const closeMenu = () => {
    setClick(false);
    document.body.classList.remove('no-scroll');
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', target: 'hero' },
    { name: 'About', target: 'about' },
    { name: 'Showroom', target: 'listings' },
    { name: 'Contact', target: 'contact' },
    { name: 'Reviews', target: 'reviews' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-glass-gradient backdrop-blur-sm"></div>
      
      <nav className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between'>
        {/* Logo */}
        <RouterLink 
          to='/' 
          className='flex items-center gap-3 group transform transition-transform duration-300 hover:scale-105'
        >
          <div className="relative">
            <img 
              src={logo} 
              alt='logo' 
              className='h-12 w-auto transition-all duration-300 group-hover:drop-shadow-lg' 
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className='sr-only'>Home</span>
        </RouterLink>

        {/* Desktop Menu */}
        <ul className='hidden md:flex items-center gap-1'>
          {navItems.map((item, index) => (
            <li key={item.target} className="relative">
              <ScrollLink 
                to={item.target} 
                smooth={true} 
                duration={800} 
                spy={true}
                activeClass="active"
                onSetActive={() => setActiveSection(item.target)}
                className={`relative px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer rounded-full group ${
                  activeSection === item.target 
                    ? 'text-brand-red' 
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-accent-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                
                {/* Active indicator */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-brand-red to-brand-accent-gold transition-all duration-300 ${
                  activeSection === item.target ? 'w-8' : 'w-0 group-hover:w-4'
                }`}></div>
                
                <span className="relative z-10">{item.name}</span>
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button 
          className='md:hidden relative p-3 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:from-brand-red/30 hover:to-brand-accent-gold/30 hover:scale-110'
          onClick={handleClick}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <div className={`absolute inset-0 transform transition-all duration-300 ${click ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'}`}>
              <FaBars size={24} className='text-white' />
            </div>
            <div className={`absolute inset-0 transform transition-all duration-300 ${click ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`}>
              <FaTimes size={24} className='text-white' />
            </div>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden relative transition-all duration-500 ease-in-out overflow-hidden ${
        click ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg"></div>
        <ul className='relative px-6 py-6 space-y-2'>
          {navItems.map((item, index) => (
            <li 
              key={item.target}
              className={`transform transition-all duration-300 ${
                click ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ScrollLink 
                to={item.target} 
                smooth={true} 
                duration={800} 
                onClick={closeMenu}
                className="block px-6 py-4 text-lg font-medium text-gray-300 rounded-xl transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-brand-red/20 hover:to-brand-accent-gold/20 hover:transform hover:scale-105 cursor-pointer"
              >
                {item.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu overlay */}
      {click && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
