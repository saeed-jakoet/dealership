import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const EnquiryForm = ({ vehicle, onClose, isFormVisible }) => {
    const form = useRef();

    const [formData, setFormData] = useState({
        to_name: '',
        from_name: '', // Add the sender's name if needed
        lastname: '',
        details: `I'm interested in the ${vehicle.name} car.`,
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isFormValid = () => {
        // Simple form validation logic
        return (
            formData.to_name.trim() !== '' &&
            formData.lastname.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.phone.trim() !== '' &&
            /^[0-9]+$/.test(formData.phone.trim()) && // Check if phone contains only numbers
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) // Check if email is valid
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Set the form data before sending
        form.current['to_name'].value = formData.to_name;
        form.current['lastname'].value = formData.lastname;
        form.current['email'].value = formData.email;
        form.current['phone'].value = formData.phone;
        form.current['details'].value = formData.details;

        // Use EmailJS to send the form data via email
        emailjs.sendForm('service_dbcag1q', 'template_nmezp0m', form.current, 'w8cyA_fEWwsNf6qBs')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        // Optionally, you can close the modal after submission
        onClose();
    };

    return (
        // Conditionally render the form based on isFormVisible prop
        isFormVisible && (
            <form ref={form} className="enquiry-form" onSubmit={handleSubmit}>
                <h2>Enquire</h2>
                <label>
                    Name<span className="required-field">*</span>
                    <input
                        type="text"
                        name="to_name"
                        value={formData.to_name}
                        onChange={handleChange}
                        placeholder="name"
                        required
                    />
                </label>
                <label>
                    Last Name<span className="required-field">*</span>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="lastname"
                        required
                    />
                </label>
                <label>
                    Email<span className="required-field">*</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                    />
                </label>
                <label>
                    Phone Number<span className="required-field">*</span>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        pattern="[0-9]+"
                        required
                    />
                </label>
                <label>
                    Details
                    <textarea name="details" value={formData.details} onChange={handleChange} />
                </label>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        )
    );
};

export default EnquiryForm;
