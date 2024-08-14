import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorProfile.css';

const VendorProfile = () => {
  const [vendor, setVendor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    businessname: '',
    businessdescription: '',
    province: '',
    city: '',
    postalcode: '',
    businessnumber: '',
    category: '',
    subcategory: '',
    businessImages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState(null); // State for file uploads

  const vendorId = localStorage.getItem('vendorId');

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/vendor/vendorDetails?vendorid=${vendorId}`
        );
        const data = response.data[0];
        setVendor({
          firstName: data.vendorid.firstName,
          lastName: data.vendorid.lastName,
          email: data.vendorid.email,
          phonenumber: data.vendorid.phonenumber,
          businessname: data.businessname,
          businessdescription: data.businessdescription,
          province: data.province,
          city: data.city,
          postalcode: data.postalcode,
          businessnumber: data.businessnumber,
          category: data.category?.name || 'N/A',
          subcategory: data.subcategory?.name || 'N/A',
          businessImages: data.businessImages || [],
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Store the selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append editable fields
      formData.append('firstName', vendor.firstName);
      formData.append('lastName', vendor.lastName);
      formData.append('email', vendor.email);
      formData.append('phonenumber', vendor.phonenumber);

      // // Append existing images if no new files are selected
      // if (!files || files.length === 0) {
      //   vendor.businessImages.forEach((image, index) => {
      //     formData.append('businessImages', image);
      //   });
      // } else {
      //   // Append new files
      //   if (files && files.length > 0) {
      //     for (const file of files) {
      //       formData.append('businessImages', file);
      //     }
      //   }
      // }

      // Make the API request
      const response = await axios.put(
        `http://localhost:4000/user/editUser/${vendorId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Vendor data submitted:', response.data);
    } catch (err) {
      console.error(
        'Error updating vendor profile:',
        err.response ? err.response.data : err.message
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching vendor data: {error.message}</p>;

  return (
    <div className='vendor-profile'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={vendor.firstName || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={vendor.lastName || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={vendor.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phonenumber'>Phone Number</label>
          <input
            type='text'
            id='phonenumber'
            name='phonenumber'
            value={vendor.phonenumber || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Business Name</label>
          <p>{vendor.businessname}</p>
        </div>
        <div className='form-group'>
          <label>Business Description</label>
          <p>{vendor.businessdescription}</p>
        </div>
        <div className='form-group'>
          <label>Province</label>
          <p>{vendor.province}</p>
        </div>
        <div className='form-group'>
          <label>City</label>
          <p>{vendor.city}</p>
        </div>
        <div className='form-group'>
          <label>Postal Code</label>
          <p>{vendor.postalcode}</p>
        </div>
        <div className='form-group'>
          <label>Business Number</label>
          <p>{vendor.businessnumber}</p>
        </div>
        <div className='form-group'>
          <label>Category</label>
          <p>{vendor.category}</p>
        </div>
        <div className='form-group'>
          <label>Subcategory</label>
          <p>{vendor.subcategory}</p>
        </div>
        <div className='form-group'>
          <label htmlFor='businessImages'>Business Images</label>
          <input
            type='file'
            id='businessImages'
            name='businessImages'
            multiple
            onChange={handleFileChange}
          />
          <div className='image-gallery'>
            {vendor.businessImages && vendor.businessImages.length > 0 ? (
              vendor.businessImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Business ${index}`}
                  className='business-image'
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
        <button type='submit'>Update Profile</button>
      </form>
    </div>
  );
};

export default VendorProfile;