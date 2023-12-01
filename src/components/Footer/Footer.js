// Footer.js

import React from 'react';
import { Link } from 'react-scroll';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { RiTwitterXLine } from "react-icons/ri";
import Logo from '../images/logo.png'
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='columns'>
          {/* Logo */}
          <div className='column'>
            <img src={Logo} alt='Logo' className='logo' />
          </div>

          {/* Column 1: Navigation */}
          <div className='column'>
            <h3>Navigation</h3>
            <ul>
              <li><Link to='hero' smooth={true} duration={500}>Home</Link></li>
              <li><Link to='about' smooth={true} duration={500}>About</Link></li>
              <li><Link to='listings' smooth={true} duration={500}>Showroom</Link></li>
              <li><Link to='demo' smooth={true} duration={500}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Opening and Closing Times */}
          <div className='column'>
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 9 AM - 6 PM</p>
            <p>Saturday: 10 AM - 4 PM</p>
            <p>Sunday: Closed</p>
          </div>

          {/* Column 3: Contact Information */}
          <div className='column'>
            <h3>Contact Information</h3>
            <p>Email: info@farauto.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Main St, Cityville, State, 12345</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className='social-icons'>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'><FaFacebook /></a>
          <a href='https://x.com' target='_blank' rel='noopener noreferrer'><RiTwitterXLine /></a>
        </div>

        {/* Bottom Line */}
        <div className='bottom'>
          <span className='line'></span>
          <p>2023 FarAuto. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
