import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegisterModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          <h3>Login</h3>
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
          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-dark submitbutton rounded-pill'
            >
              Login
            </button>
          </div>
          <div className='text-center mt-3'>
            <p>
              Don't have an account? <a href='/UserRegister'>Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Login;
