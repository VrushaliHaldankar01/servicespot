import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegisterModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div>
      <Header />
      <div className='container mt-4 mb-4'>
        <div className='registration-box p-4 rounded'>
          <form onSubmit={handleSubmit} className='rounded'>
            <h3 className='text-center mb-4'>Register as User</h3>
            <div className='row mb-3'>
              <div className='col'>
                <label>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='col'>
                <label>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='mb-3'>
              <label>Contact Number</label>
              <input
                type='tel'
                className='form-control'
                name='contactNumber'
                value={formData.contactNumber}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>
            <div className='mb-3'>
              <label>Email</label>
              <input
                type='email'
                className='form-control'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-check mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label className='form-check-label'>
                I understand and agree to Terms & Conditions
              </label>
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-dark submitbutton rounded-pill'
              >
                Sign Up
              </button>
            </div>
            <div className='text-center mt-3'>
              <p>
                Already have an account? <a href='/Login'>Sign In</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegister;
