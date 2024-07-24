import React, { useState, useEffect } from 'react';
import './VendorProfile.css'; // Add styles for the profile

const VendorProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    businessDescription: '',
    province: '',
    city: '',
    postalCode: '',
    businessNumber: '',
    businessCategory: '',
    businessSubcategory: '',
    businessImage: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...profile });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/vendor-profile'); // Replace with your API endpoint
        const data = await response.json();
        setProfile(data);
        setFormValues(data); // Initialize form values with fetched data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/update-profile', { // Replace with your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setEditMode(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormValues(profile); // Reset form values to current profile
    setEditMode(false);
  };

  return (
    <div className="vendor-profile">
      <h3>Vendor Profile</h3>
      <div className="profile-details">
        {editMode ? (
          <div className="profile-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Business Name:
              <input
                type="text"
                name="businessName"
                value={formValues.businessName}
                onChange={handleChange}
              />
            </label>
            <label>
              Business Description:
              <input
                type="text"
                name="businessDescription"
                value={formValues.businessDescription}
                onChange={handleChange}
              />
            </label>
            <label>
              Province:
              <input
                type="text"
                name="province"
                value={formValues.province}
                onChange={handleChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                name="postalCode"
                value={formValues.postalCode}
                onChange={handleChange}
              />
            </label>
            <label>
              Business Number:
              <input
                type="text"
                name="businessNumber"
                value={formValues.businessNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Business Category:
              <input
                type="text"
                name="businessCategory"
                value={formValues.businessCategory}
                onChange={handleChange}
              />
            </label>
            <label>
              Business Subcategory:
              <input
                type="text"
                name="businessSubcategory"
                value={formValues.businessSubcategory}
                onChange={handleChange}
              />
            </label>
            <label>
              Business Image URL:
              <input
                type="text"
                name="businessImage"
                value={formValues.businessImage}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Business Name:</strong> {profile.businessName}</p>
            <p><strong>Business Description:</strong> {profile.businessDescription}</p>
            <p><strong>Province:</strong> {profile.province}</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>Postal Code:</strong> {profile.postalCode}</p>
            <p><strong>Business Number:</strong> {profile.businessNumber}</p>
            <p><strong>Business Category:</strong> {profile.businessCategory}</p>
            <p><strong>Business Subcategory:</strong> {profile.businessSubcategory}</p>
            {profile.businessImage && <p><strong>Business Image:</strong> <img src={profile.businessImage} alt="Business" /></p>}
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;
