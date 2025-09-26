import React, { useState, useRef } from 'react';
import { Element } from 'react-scroll';
import { motion, useInView } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import contactImage from './images/contact.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    to_name: '',
    lastname: '',
    email: '',
    phone: '',
    details: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState('');

  const form = useRef();
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });

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
      formData.details.trim() !== '' &&
      /^[0-9]+$/.test(formData.phone.trim()) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields correctly.' });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    let emailSuccess = false;
    let postSuccess = false;
    let errorMsg = '';
    try {
      // 1. Send to backend first
      let backendSuccess = false;
      let backendError = '';
      try {
        const inboxData = {
          name: formData.to_name.trim(),
          email: formData.email.trim().toLowerCase(),
          lastName: formData.lastname.trim(),
          message: formData.details.trim(),
          phone: formData.phone ? formData.phone.trim() : '',
          status: false
        };
        const apiBase = process.env.REACT_APP_API_BASE_URL || '';
        const res = await fetch(`${apiBase}/inbox/new`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inboxData)
        });
        if (!res.ok) {
          try {
            const err = await res.json();
            backendError = err.message || 'Failed to send message';
          } catch {
            backendError = 'Oops! Too many requests. Please give it a moment and try again.';
          }
          throw new Error(backendError);
        }
        backendSuccess = true;
      } catch (err) {
        errorMsg = err?.message || 'Backend notification failed.';
        setSubmitStatus({
          type: 'error',
          message: errorMsg
        });
        setIsSubmitting(false);
        return;
      }
      // 2. Only send email if backend succeeded
      try {
        const result = await emailjs.sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_EMAILJS_USER_ID
        );
        console.log(result.text);
        emailSuccess = true;
      } catch (err) {
        errorMsg = 'Email notification failed. ' + (err?.text || err?.message || '');
        setSubmitStatus({
          type: 'error',
          message: errorMsg
        });
        setIsSubmitting(false);
        return;
      }
      // 3. If both succeeded
      if (backendSuccess && emailSuccess) {
        setSubmitStatus({
          type: 'success',
          message: "Thank you! Your message has been sent successfully. We'll get back to you soon."
        });
        setFormData({
          to_name: '',
          lastname: '',
          email: '',
          phone: '',
          details: '',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Our Showroom',
      details: ['3 Muir Street', 'District Six, Cape Town', '8001, South Africa'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: ['+27 21 123 4567', '+27 82 123 4567', 'Mon-Fri: 8AM-6PM'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['info@farauto.co.za', 'sales@farauto.co.za', 'We reply within 24hrs'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00AM - 6:00PM', 'Saturday: 9:00AM - 4:00PM', 'Sunday: Closed'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Element name="contact">
      <section 
        ref={contactRef}
        className="relative min-h-screen py-20 bg-gradient-to-b from-black via-brand-gray-dark to-black overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${contactImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-red/20 to-brand-accent-gold/20 backdrop-blur-sm border border-white/10 mb-6"
            >
              <FaEnvelope className="text-brand-red" />
              <span className="text-sm font-medium tracking-wide text-white/90">GET IN TOUCH</span>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Let's{' '}
              <span className="bg-gradient-to-r from-brand-red to-brand-accent-gold bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Ready to find your perfect vehicle? We're here to help you every step of the way.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <motion.div
                variants={itemVariants}
                className="p-8 rounded-3xl bg-glass-gradient backdrop-blur-sm border border-white/10 shadow-glass"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="relative">
                      <label 
                        htmlFor="to_name" 
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'to_name' || formData.to_name 
                            ? '-top-2 text-xs bg-brand-gray-dark px-2 text-brand-red' 
                            : 'top-4 text-gray-400'
                        }`}
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="to_name"
                        name="to_name"
                        value={formData.to_name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('to_name')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                      <label 
                        htmlFor="lastname" 
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'lastname' || formData.lastname 
                            ? '-top-2 text-xs bg-brand-gray-dark px-2 text-brand-red' 
                            : 'top-4 text-gray-400'
                        }`}
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('lastname')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="relative">
                      <label 
                        htmlFor="email" 
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'email' || formData.email 
                            ? '-top-2 text-xs bg-brand-gray-dark px-2 text-brand-red' 
                            : 'top-4 text-gray-400'
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label 
                        htmlFor="phone" 
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'phone' || formData.phone 
                            ? '-top-2 text-xs bg-brand-gray-dark px-2 text-brand-red' 
                            : 'top-4 text-gray-400'
                        }`}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField('')}
                        pattern="[0-9]+"
                        className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label 
                      htmlFor="details" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'details' || formData.details 
                          ? '-top-2 text-xs bg-brand-gray-dark px-2 text-brand-red' 
                          : 'top-4 text-gray-400'
                      }`}
                    >
                      Message *
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('details')}
                      onBlur={() => setFocusedField('')}
                      rows="4"
                      className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                          : 'bg-red-500/20 border border-red-500/30 text-red-300'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-xl font-semibold text-white shadow-2xl hover:shadow-brand-red/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group p-6 rounded-2xl bg-glass-gradient backdrop-blur-sm border border-white/10 hover:border-brand-red/30 transition-all duration-500"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="text-white text-lg" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3">{info.title}</h4>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-400 text-sm">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                variants={itemVariants}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="aspect-video">
                  <iframe
                    title="FARAUTO Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.527168642012!2d18.42951037654271!3d-33.92756697320422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5d866003933d%3A0x50bdb01a91767a7e!2s3%20Muir%20St%2C%20District%20Six%2C%20Cape%20Town%2C%208001!5e0!3m2!1sen!2sza!4v1702062123125!5m2!1sen!2sza"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  />
                </div>
                
                {/* Map Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl pointer-events-none" />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={itemVariants}
                className="flex gap-4"
              >
                <motion.a
                  href="https://wa.me/27821234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white font-medium shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="text-xl" />
                  WhatsApp
                </motion.a>
                
                <motion.a
                  href="tel:+27211234567"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="text-lg" />
                  Call Now
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Contact;

