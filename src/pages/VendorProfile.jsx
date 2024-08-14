import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorProfile.css';

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState(null); // State for file uploads

  // Replace with the actual vendor id you get after login
  const vendorId = localStorage.getItem('vendorId');

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/vendor/vendorDetails?vendorid=${vendorId}`
        );
        setVendor(response.data[0]);
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

      // Append form fields
      for (const key in vendor) {
        if (vendor.hasOwnProperty(key)) {
          formData.append(key, vendor[key]);
        }
      }

      // Append files if there are new files selected
      if (files && files.length > 0) {
        for (const file of files) {
          formData.append('businessImages', file);
        }
      }

      // Log the form data for debugging
      console.log('FormData content:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

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

      // Assuming you also need to log updated user and vendor data
      console.log('Updated User:', response.data.updatedUser);
      console.log('Updated Vendor:', response.data.updatedVendor);

      // Optionally, handle success (e.g., show a success message)
    } catch (err) {
      console.error('Error updating vendor profile:', err);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching vendor data: {error.message}</p>;

  return (
    <div className='vendor-profile'>
      {vendor && (
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='businessname'>Business Name</label>
            <input
              type='text'
              id='businessname'
              name='businessname'
              value={vendor.businessname || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='businessdescription'>Business Description</label>
            <textarea
              id='businessdescription'
              name='businessdescription'
              value={vendor.businessdescription || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='province'>Province</label>
            <input
              type='text'
              id='province'
              name='province'
              value={vendor.province || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              name='city'
              value={vendor.city || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='postalcode'>Postal Code</label>
            <input
              type='text'
              id='postalcode'
              name='postalcode'
              value={vendor.postalcode || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='businessnumber'>Business Number</label>
            <input
              type='text'
              id='businessnumber'
              name='businessnumber'
              value={vendor.businessnumber || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Category</label>
            <p>{vendor.category ? vendor.category.name : 'N/A'}</p>
          </div>
          <div className='form-group'>
            <label>Subcategory</label>
            <p>{vendor.subcategory ? vendor.subcategory.name : 'N/A'}</p>
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
      )}
    </div>
  );
};

export default VendorProfile;
 