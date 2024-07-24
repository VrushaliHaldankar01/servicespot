import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; // Import Header component
import Footer from '../components/Footer'; // Import Footer component
import '../css/ProfileModule.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    password: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/user/userdetails?email=rk@gmail.com', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { email, firstName, lastName, contactNumber } = response.data;
        console.log(response.data);
        setFormData({ email, firstName, lastName, contactNumber });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:4000/user/register',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Handle successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:4000/user/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header /> {/* Add Header here */}
      <div className="profile-container flex-grow-1">
        <Sidebar firstName={formData.firstName} lastName={formData.lastName} />
        <div className="profile-form-container">
          <h3>My Profile</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-section">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-row">
              <div className="form-section form-section-half">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-section form-section-half">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-section">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <button className="update-btn" type="submit">Update</button>
          </form>

          <h3>Change Password</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-section">
              <label>Current Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <button className="update-btn" type="submit">Update Password</button>
          </form>

          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

const Sidebar = ({ firstName, lastName }) => (
  <div className="sidebar">
    <h1>Welcome {firstName} {lastName}</h1>
    <ul>
      <li><a href="/Profile">My Profile</a></li>
      <li><a href="/Inbox">My Inbox</a></li>
      <li><a href="/Bookings">My Bookings</a></li>
      <li><a href="/Help">Get Help</a></li>
    </ul>
  </div>
);

export default Profile;
