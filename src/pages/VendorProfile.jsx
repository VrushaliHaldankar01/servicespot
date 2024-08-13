import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorProfile.css';

const VendorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const vendorId = localStorage.getItem('user'); // Replace 'user' if you're storing a different key
      try {
        const response = await axios.get(`http://localhost:4000/vendor/vendorDetails?id=${vendorId}`);
        const data = response.data[0]; // Assuming the API returns an array with a single vendor object
        setProfile(data);
        setFormValues({
          name: `${data.vendorid.firstName} ${data.vendorid.lastName}`,
          email: data.vendorid.email,
          phone: data.vendorid.phonenumber,
          address: data.address || '',
          businessName: data.businessname,
          businessDescription: data.businessdescription,
          province: data.province,
          city: data.city,
          postalCode: data.postalcode,
          businessNumber: data.businessnumber,
          businessCategory: data.category.name,
          businessSubcategory: data.subcategory.name,
          businessImage: data.businessImages[0],
        });
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
      const response = await axios.post('http://localhost:4000/vendor/updateProfile', formValues);
      if (response.status === 200) {
        setProfile(formValues);
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
      {profile ? (
        <div className="profile-details">
          {editMode ? (
            <div className="profile-form">
              <label>
                Name:
                <input type="text" name="name" value={formValues.name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formValues.email} onChange={handleChange} />
              </label>
              <label>
                Phone:
                <input type="text" name="phone" value={formValues.phone} onChange={handleChange} />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={formValues.address} onChange={handleChange} />
              </label>
              <label>
                Business Name:
                <input type="text" name="businessName" value={formValues.businessName} onChange={handleChange} />
              </label>
              <label>
                Business Description:
                <input type="text" name="businessDescription" value={formValues.businessDescription} onChange={handleChange} />
              </label>
              <label>
                Province:
                <input type="text" name="province" value={formValues.province} onChange={handleChange} />
              </label>
              <label>
                City:
                <input type="text" name="city" value={formValues.city} onChange={handleChange} />
              </label>
              <label>
                Postal Code:
                <input type="text" name="postalCode" value={formValues.postalCode} onChange={handleChange} />
              </label>
              <label>
                Business Number:
                <input type="text" name="businessNumber" value={formValues.businessNumber} onChange={handleChange} />
              </label>
              <label>
                Business Category:
                <input type="text" name="businessCategory" value={formValues.businessCategory} onChange={handleChange} />
              </label>
              <label>
                Business Subcategory:
                <input type="text" name="businessSubcategory" value={formValues.businessSubcategory} onChange={handleChange} />
              </label>
              <label>
                Business Image URL:
                <input type="text" name="businessImage" value={formValues.businessImage} onChange={handleChange} />
              </label>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div className="profile-info">
              <div><strong>Name:</strong> {profile.vendorid.firstName} {profile.vendorid.lastName}</div>
              <div><strong>Email:</strong> {profile.vendorid.email}</div>
              <div><strong>Phone:</strong> {profile.vendorid.phonenumber}</div>
              <div><strong>Address:</strong> {profile.address}</div>
              <div><strong>Business Name:</strong> {profile.businessname}</div>
              <div><strong>Business Description:</strong> {profile.businessdescription}</div>
              <div><strong>Province:</strong> {profile.province}</div>
              <div><strong>City:</strong> {profile.city}</div>
              <div><strong>Postal Code:</strong> {profile.postalcode}</div>
              <div><strong>Business Number:</strong> {profile.businessnumber}</div>
              <div><strong>Business Category:</strong> {profile.category.name}</div>
              <div><strong>Business Subcategory:</strong> {profile.subcategory.name}</div>
              {profile.businessImages.length > 0 && (
                <div><strong>Business Image:</strong> <img src={profile.businessImages[0]} alt="Business" /></div>
              )}
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default VendorProfile;
