// Contact.js
import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p className="contact-text">Have questions or feedback? Reach out to us!</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="lastname">Lastname:</label>
        <input type="text" id="lastname" name="lastname" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="mobile">Mobile:</label>
        <input type="mobile" id="nobile" name="mobile" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Submit</button>
      </form>

      {/* Contact Information
      <div className="contact-info">
        <p>Address: 123 Main Street, Cityville</p>
        <p>Opening Hours: Mon-Fri 9am-5pm</p>
        <p>Contact: +123 456 7890</p>
      </div> */}

      {/* Social Icons */}
      {/* <div className="social-icons">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <RiTwitterXLine />
        </a>
      </div> */}
    </div>
  );
};

export default Contact;
