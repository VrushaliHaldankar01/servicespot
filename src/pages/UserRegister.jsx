import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegisterModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import Login from './Login';
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          'http://localhost:4000/user/register',
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phonenumber: formData.contactNumber,
          }
        );
        console.log(response.data);
        setError('');
        // Handle success (e.g., redirect user, update state)
      } catch (error) {
        console.error('Registration Error:', error);
        setError(
          error.response.data.error ||
            'An unexpected error occurred. Please try again.'
        );
        // Handle error (e.g., display error message to user)
      }
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/user/login',
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log('Login Response:', response.data);
      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/Login');
      // Handle success (e.g., redirect user, update state)
    } catch (error) {
      console.error('Login Error:', error);
      setError(
        error.response.data.error ||
          'An unexpected error occurred. Please try again.'
      );
      // Handle error (e.g., display error message to user)
    }

  };

  return (
    <div>
      <Header />
      <div className='container mt-4 mb-4' style={{ maxWidth: '700px' }}>
        <div className='registration-box p-4 rounded'>
          <form onSubmit={handleSubmitRegistration} className='p-4 rounded'>
            <h3>Register as User</h3>
            <div className='row'>
              <div className='col mb-3'>
                <label>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  
                />
                {errors.firstName && (
                  <p className='text-danger'>{errors.firstName}</p>
                )}
              </div>
              <div className='col mb-3'>
                <label>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  
                />
                {errors.lastName && (
                  <p className='text-danger'>{errors.lastName}</p>
                )}
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
                
              />
              {errors.email && (
                <p className='text-danger'>{errors.email}</p>
              )}
            </div>

            <div className='form-group mb-3'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={formData.password}
                onChange={handleChange}
                
              />
              {errors.password && (
                <p className='text-danger'>{errors.password}</p>
              )}
            </div>

            <div className='form-check mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={handleChange}
                
              />
              <label className='form-check-label'>
                I understand and agree to Terms & Conditions
              </label>
              {errors.agreeTerms && (
                <p className='text-danger'>{errors.agreeTerms}</p>
              )}
            </div>

            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-dark submitbutton rounded-pill'
              >
                Submit
              </button>
            </div>
            {error && (
              <div className='alert alert-danger mt-3'>{error}</div>
            )}
            <div className='text-center mt-3'>
              <p>
                Already have an account? <a href='/Login'>Sign in</a>
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

