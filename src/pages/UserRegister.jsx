import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegisterModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName =
        'First Name should not contain numbers or special characters';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName =
        'Last Name should not contain numbers or special characters';
    }
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        'Contact Number must be in the format XXX-XXX-XXXX';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter the correct format for email like-- abc@xyz.ca';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    return newErrors;
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
   
    console.log(formData);
  };

  return (
    <div>
      <Header/>
      <div className='container mt-4 mb-4' style={{ maxWidth: '700px' }}>
      <div className='registration-box p-4 rounded'>
        <form onSubmit={handleSubmit} className='p-4 rounded'>
          <h3>Register as User</h3>
          <div class='row'>
            <div class='col mb-3'>
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
            <div class='col mb-3'>
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
          <div class='col mb-3'>
              <label>Contact Number</label>
              <input
                type='tel'
                className='form-control'
                name='contactNumber'
                value={formData.contactNumber}
                onChange={handleChange}
                //  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                
              />
              {errors.contactNumber && (
                <p className='text-danger'>{errors.contactNumber}</p>
              )}
            </div>

          <div className='form-group mb-3'>
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
          
          <div className='form-group mb-3'>
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
              Submit
            </button>
          </div>
          <div className='text-center mt-3'>
            <p>
              Already have an account? <a href='/Login'>Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UserRegister;

