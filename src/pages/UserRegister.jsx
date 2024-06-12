import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegisterModule.css';
import Header from '../components/Header';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber:'',
    email: '',
    password: '',
   
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
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
                name='lastName'
                value={formData.contactNumber}
                onChange={handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
