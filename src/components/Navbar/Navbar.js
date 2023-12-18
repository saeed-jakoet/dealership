// Navbar.js
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../images/logo2.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolling(false);
      }, 3000); // Adjust the timeout duration as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header ${scrolling ? 'scrolling' : ''} ${click ? 'nav-open' : ''}`}>
      <nav className='navbar'>
        <RouterLink to='/' className='logo'>
          <img src={logo} alt='logo' />
        </RouterLink>
        <div className='hamburger' onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: '#ffffff' }} />
          ) : (
            <FaBars size={30} style={{ color: '#ffffff' }} />
          )}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <ScrollLink to='hero' smooth={true} duration={500} onClick={closeMenu}>
              Home
            </ScrollLink>
          </li>
          <li className='nav-item'>
            <ScrollLink to='about' smooth={true} duration={500} delay={100} onClick={closeMenu}>
              About
            </ScrollLink>
          </li>
          <li className='nav-item'>
            <ScrollLink to='listings' smooth={true} duration={500} onClick={closeMenu}>
              Showroom
            </ScrollLink>
          </li>
          <li className='nav-item'>
            <ScrollLink to='contact' smooth={true} duration={500} onClick={closeMenu}>
              Contact us
            </ScrollLink>
          </li>
          <li className='nav-item'>
            <ScrollLink to='reviews' smooth={true} duration={500} onClick={closeMenu}>
              Reviews
            </ScrollLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
