import React, { useState } from 'react';

const EnquiryForm = ({ vehicle, onClose, isFormVisible }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        details: `I'm interested in the ${vehicle.name} car.`,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the form submission
        console.log('Form submitted:', formData);
        // Optionally, you can close the modal after submission
        onClose();
    };

    return (
        // Conditionally render the form based on isFormVisible prop
        isFormVisible && (
            <form className="enquiry-form" onSubmit={handleSubmit}>
                <h2>Enquire</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Phone Number:
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </label>
                <label>
                    Details:
                    <textarea name="details" value={formData.details} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        )
    );
};

export default EnquiryForm;