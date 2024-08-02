import React, { useState, useEffect } from 'react';
import './VendorProfile.css';

const VendorProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    businessName: 'Doe Plumbing Services',
    businessDescription: 'Your partner in plumbing, ensuring a lifetime of comfort and hassle-free living.',
    province: 'Ontario',
    city: 'Toronto',
    postalCode: 'A1B 2C3',
    businessNumber: 'BN123456789',
    businessCategory: 'Plumbing',
    businessSubcategory: 'Residential Plumbing',
    businessImage: 'https://media.istockphoto.com/id/1318150161/photo/a-man-using-a-tool-to-fix-parts-of-pipes-during-work.jpg?b=1&s=612x612&w=0&k=20&c=DXP-s82hEHWBS6SmNfJZoiIUbsNXvYPELU209m1n7cQ=',
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...profile });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/vendor-profile'); // Replace with your API endpoint
        const data = await response.json();
        setProfile(data);
        setFormValues(data);
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
      const response = await fetch('/api/update-profile', {
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
    setFormValues(profile);
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
            <div><strong>Name:</strong> {profile.name}</div>
            <div><strong>Email:</strong> {profile.email}</div>
            <div><strong>Phone:</strong> {profile.phone}</div>
            <div><strong>Address:</strong> {profile.address}</div>
            <div><strong>Business Name:</strong> {profile.businessName}</div>
            <div><strong>Business Description:</strong> {profile.businessDescription}</div>
            <div><strong>Province:</strong> {profile.province}</div>
            <div><strong>City:</strong> {profile.city}</div>
            <div><strong>Postal Code:</strong> {profile.postalCode}</div>
            <div><strong>Business Number:</strong> {profile.businessNumber}</div>
            <div><strong>Business Category:</strong> {profile.businessCategory}</div>
            <div><strong>Business Subcategory:</strong> {profile.businessSubcategory}</div>
            {profile.businessImage && <div><strong>Business Image:</strong> <img src={profile.businessImage} alt="Business" /></div>}
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;
