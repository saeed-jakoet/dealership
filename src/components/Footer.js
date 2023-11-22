import React from 'react';
import { Link } from 'react-scroll';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { RiTwitterXLine } from "react-icons/ri";
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <ul>
          <li className='nav-item'>
            <Link to='hero' smooth={true} duration={500}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='about' smooth={true} duration={500}>About</Link>
          </li>
          <li className='nav-item'>
            <Link to='listings' smooth={true} duration={500}>Showroom</Link>
          </li>
          <li className='nav-item'>
            <Link to='demo' smooth={true} duration={500}>Contact Us</Link>
          </li>
        </ul>
        <div className='social-icons'>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'><FaFacebook /></a>
          <a href='https://x.com' target='_blank' rel='noopener noreferrer'><RiTwitterXLine /></a>
        </div>
        <div className='bottom'>
          <span className='line'></span>
          <p>2023 FarAuto. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
