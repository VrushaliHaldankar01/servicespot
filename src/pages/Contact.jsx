import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ContactModule.css'; // Import your CSS file for additional styling if needed

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format phone number
    if (name === 'phone') {
      const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits long';
      isValid = false;
    }

    if (!formData.interest) {
      newErrors.interest = 'Interest is required';
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Clear form data after successful validation
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
      });

      // Optionally, show a success message
      alert('Your message has been sent successfully!');

      // Optionally, reset errors
      setErrors({});
    }
  };

  return (
    <div className="contact-page">
      <Header />
      <div className='container mt-4 mb-4'>
        <div className='row'>
          <div className='col-12 text-center mb-4'>
            <img src="/images/contact.jpg" alt="Contact" className='img-fluid contact-image' />
          </div>
          <div className='col-md-8'>
            <div className='form-container p-4 rounded'>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <label>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <small className='text-danger'>{errors.name}</small>}
                </div>
                <div className='form-group mb-3'>
                  <label>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='contact@example.com'
                    required
                  />
                  {errors.email && <small className='text-danger'>{errors.email}</small>}
                </div>
                <div className='form-group mb-3'>
                  <label>Phone Number</label>
                  <input
                    type='tel'
                    className='form-control'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='1234567890'
                    pattern='\d{10}'
                    required
                  />
                  {errors.phone && <small className='text-danger'>{errors.phone}</small>}
                </div>
                <div className='form-group mb-3'>
                  <label>Interest</label>
                  <select
                    className='form-control'
                    name='interest'
                    value={formData.interest}
                    onChange={handleChange}
                    required
                  >
                    <option value=''>Select Interest</option>
                    <option value='services'>Services</option>
                    <option value='support'>Support</option>
                    <option value='general'>General Inquiry</option>
                  </select>
                  {errors.interest && <small className='text-danger'>{errors.interest}</small>}
                </div>
                <div className='form-group mb-3'>
                  <label>Message</label>
                  <textarea
                    className='form-control'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows='4'
                    required
                  ></textarea>
                  {errors.message && <small className='text-danger'>{errors.message}</small>}
                </div>
                <div className='form-group btn-submit'>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='contact-details p-4 rounded'>
              <h4>Contact Details</h4>
              <p>Email: contact@example.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Main St, City, State</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
