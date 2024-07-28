import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import '../css/ProfileModule.css';

const ProfileDetails = ({ formData, handleChange, handleUpdate }) => (
  <>
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
  </>
);

const Profile = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    password: '',
    newPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [sidebarActive, setSidebarActive] = useState(false); // State to control sidebar visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('User email not found in local storage');
        }

        const response = await axios.get(`http://localhost:4000/user/userdetails`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { email },
        });

        const { email: userEmail, firstName, lastName, phonenumber: contactNumber } = response.data.user;
        setFormData({ email: userEmail, firstName, lastName, contactNumber, password: '', newPassword: '' });
        console.log('User data:', response.data);
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
        'http://localhost:4000/user/update',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phonenumber: formData.contactNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Handle successful update, e.g., show a success message
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
      localStorage.removeItem('email');
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="profile-container flex-grow-1">
        <button className="menu-toggle" onClick={() => setSidebarActive(!sidebarActive)}>Menu</button>
        <Sidebar className={sidebarActive ? 'active' : ''} firstName={formData.firstName} lastName={formData.lastName} />
        <div className="profile-form-container">
          <Routes>
            <Route path="/" element={<ProfileDetails formData={formData} handleChange={handleChange} handleUpdate={handleUpdate} successMessage={successMessage} />} />
            {/* Define other routes here */}
            <Route path="/Inbox" element={<div>Inbox Content</div>} />
            <Route path="/Bookings" element={<div>Bookings Content</div>} />
            <Route path="/Help" element={<div>Help Content</div>} />
          </Routes>
          <button className="delete-account-btn" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
