// Footer.js

import React from 'react';
import { Link } from 'react-scroll';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
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
            <p>Monday - Friday: 08:30 - 17:00</p>
            <p>Saturday: 09:00  - 13:00 </p>
            <p>Sunday & public holidays: Closed</p>
          </div>

          {/* Column 3: Contact Information */}
          <div className='column'>
            <h3>Contact Information</h3>
            <p>Email: info@farauto.com</p>
            <p>Phone: +27 83 578 9437</p>
            <p>Address: 3 Muir Street and Selkirk StreetDistrict 6 Zonnebloem Cape TownSouth Africa</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className='social-icons'>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'><FaFacebook /></a>
          <a href='https://wa.me/0796957936' target='_blank' rel='noopener noreferrer'><FaWhatsapp /></a> 
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
