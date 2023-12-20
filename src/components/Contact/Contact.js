import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';;

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
    console.log('Before form validation');

    e.preventDefault();

    if (!isFormValid()) {
      console.log('Form validation failed');
      alert('Please fill in all fields correctly.');
      return;
    }

    console.log('Form validation passed');

    console.log('Form submitted:', formData);


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
        <div className="map-wrapper">
          <div className='map-margin-container'>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.527168642012!2d18.42951037654271!3d-33.92756697320422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5d866003933d%3A0x50bdb01a91767a7e!2s3%20Muir%20St%2C%20District%20Six%2C%20Cape%20Town%2C%208001!5e0!3m2!1sen!2sza!4v1702062123125!5m2!1sen!2sza"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

