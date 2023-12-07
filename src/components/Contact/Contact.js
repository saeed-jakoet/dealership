// Contact.js
import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { RiTwitterXLine } from 'react-icons/ri';
import './Contact.css';

const shopLocation = {
  lat: -33.928030,
  lng: 18.431940,
};

const apiKey = 'AIzaSyB8sQCIIhb09ymyOQYH7UGLnilib1l1s6k';

const Contact = () => {
  return (
    <div className="contact">
      <div className="text-container">
        <h1>Contact Us</h1>
        <p className="contact-text">Have questions or feedback? Reach out to us!</p>
      </div>

      <div className="content-container">
        <div className="form-container">
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="lastname">Lastname:</label>
            <input type="text" id="lastname" name="lastname" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="mobile">Mobile:</label>
            <input type="mobile" id="mobile" name="mobile" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit">Submit</button>
          </form>

        </div>

        <div className="map-container">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
              }}
              center={shopLocation}
              zoom={15}
            >
              <Marker position={shopLocation} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Contact;
