import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Contact.css';;

const apiKey = 'AIzaSyB8sQCIIhb09ymyOQYH7UGLnilib1l1s6k'

const shopLocation = {
  lat: -33.928030,
  lng: 18.431940,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    to_name: '',
    lastname: '',
    email: '',
    phone: '',
    details: '',
  });

  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.to_name.trim() !== '' &&
      formData.lastname.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      /^[0-9]+$/.test(formData.phone.trim()) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all fields correctly.');
      return;
    }

    emailjs
      .sendForm('service_dbcag1q', 'template_nmezp0m', form.current, 'w8cyA_fEWwsNf6qBs')
      .then((result) => {
        console.log(result.text);
        alert('Your message has been sent successfully!');
      })
      .catch((error) => {
        console.log(error.text);
        alert('Oops! Something went wrong. Please try again later.');
      });

    setFormData({
      to_name: '',
      lastname: '',
      email: '',
      phone: '',
      details: '',
    });
  };

  return (
    <div className="contact">
      <div className="text-container">
        <h1>Contact Us</h1>
        <p className="contact-text">Have questions or feedback? Reach out to us!</p>
      </div>

      <div className="content-container">
        <div className="form-container">
          <form ref={form} onSubmit={handleSubmit}>
            <label htmlFor="to_name">Name<span className="required-field">*</span></label>
            <input
              type="text"
              id="to_name"
              name="to_name"
              value={formData.to_name}
              onChange={handleChange}
              placeholder="name"
              required
            />

            <label htmlFor="lastname">Lastname<span className="required-field">*</span></label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="lastname"
              required
            />

            <label htmlFor="email">Email<span className="required-field">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />

            <label htmlFor="phone">Mobile<span className="required-field">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
              pattern="[0-9]+"
              required
            />

            <label htmlFor="details">Message<span className="required-field">*</span></label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="map-container">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              center={shopLocation}
              zoom={15}
              mapContainerStyle={{
                width: '100%',
                height: '400px',
                borderRadius: '5px',
              }}
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
