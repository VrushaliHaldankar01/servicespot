import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegisterModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phonenumber: formData.contactNumber,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/user/register',
        data
      );
      console.log(response.data);
      setError('');
    } catch (error) {
      console.log('Error', error);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <Header />
      <div className='container mt-4 mb-4' style={{ maxWidth: '700px' }}>
        <div className='registration-box p-4 rounded'>
          <form onSubmit={handleSubmit} className='p-4 rounded'>
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
                  required
                />
              </div>
              <div className='col mb-3'>
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
                //  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                required
              />
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
            {error && <div className='alert alert-danger mt-3'>{error}</div>}
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
