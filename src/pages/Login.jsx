import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios'; // Import Axios
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [errors, setErrors] = useState({}); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('email', response.data.user.email); // Store email in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role); // Store role in local storage
      setError('');
      setIsLoggedIn(true);
    } catch (error) {
      console.log('error', error.response.data);
      setError(error.response.data.error || 'An unexpected error occurred. Please try again.');
    }
  }
  };
  if (isLoggedIn) {
    const role = localStorage.getItem('role');
    if (role === 'vendor') {
      return <Navigate to="/VendorDashboard" replace />;
    } else {
      return <Navigate to="/Dashboard" replace />;
    }
  }

  return (
    <div className="d-flex flex-column">
      <Header />
      <div className='container mt-4 mb-4 flex-grow-1' style={{ maxWidth: '700px' }}>
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
              />
              {errors.email && <p className='text-danger'>{errors.email}</p>}
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
              {errors.password && <p className='text-danger'>{errors.password}</p>}
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-dark submitbutton rounded-pill'
              >
                Login
              </button>
            </div>
            {error && <div className='alert alert-danger mt-3'>{error}</div>}
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
