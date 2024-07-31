import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VendorRegisterModule.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName: '',
    businessDescription: '',
    province: '',
    city: '',
    postalCode: '',
    businessNumber: '',
    businessCategory: '',
    businessSubcategory: '',
    agreeTerms: false,
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const navigate = useNavigate();

  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/admin/fetchCategory'
        );
        setCategories(response.data);
        console.log('Fetched Categories:', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (formData.businessCategory) {
        const selectedCategory = categories.find(
          (category) => category._id === formData.businessCategory
        );

        if (selectedCategory) {
          try {
            const response = await axios.get(
              `http://localhost:4000/admin/fetchSubCategory?name=${selectedCategory.name}`
            );
            console.log('Fetched Subcategories:', response.data);

            // Reset subcategories based on response
            setSubcategories(response.data.length ? response.data : []);
          } catch (error) {
            console.error('Error fetching subcategories:', error);
            setSubcategories([]);
          }
        } else {
          setSubcategories([]);
        }
      } else {
        setSubcategories([]); // Reset if no category is selected
      }
    };

    fetchSubcategories();
  }, [formData.businessCategory, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (files) {
      // setFormData({
      //   ...formData,
      //   [name]: value,
      //   // [name]: files[0],
      // });
      setFile(files[0]); // Handle single file uploads
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName =
        'First Name should not contain numbers or special characters';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName =
        'Last Name should not contain numbers or special characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.businessName) {
      newErrors.businessName = 'Business Name is required';
    }
    if (!formData.businessDescription) {
      newErrors.businessDescription = 'Business Description is required';
    }
    if (!formData.province) {
      newErrors.province = 'Province is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode) {
      newErrors.postalCode = 'Postal Code is required';
    }
    if (!formData.businessNumber) {
      newErrors.businessNumber = 'Business Number is required';
    }
    if (!formData.businessCategory) {
      newErrors.businessCategory = 'Business Category is required';
    }
    if (!formData.businessSubcategory) {
      newErrors.businessSubcategory = 'Business Subcategory is required';
    }
    if (!file) {
      newErrors.businessImage = 'Business Image is required';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('phonenumber', '6765456787');
      data.append('isVendor', 'true');
      data.append('businessname', formData.businessName);
      data.append('businessdescription', formData.businessDescription);
      data.append('province', formData.province);
      data.append('city', formData.city);
      data.append('postalcode', formData.postalCode);
      data.append('businessnumber', formData.businessNumber);
      data.append('category', formData.businessCategory);
      data.append('subcategory', formData.businessSubcategory);
      data.append('isActive', 'true');
      if (file) data.append('businessImages', file);

      // Log FormData entries
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name}`); // Log file name
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      try {
        console.log('rrr1');
        const response = await axios.post(
          'http://localhost:4000/user/register',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('rrr', response.error);
        navigate('/Login');
      } catch (error) {
        console.error(
          'Error during registration:',
          error.response ? error.response.data : error.message
        );
        setErrors({ general: 'An error occurred during registration' });
      }
    }
  };

  return (
    <div>
      <Header />
      <div className='container mt-4 mb-4' style={{ maxWidth: '700px' }}>
        <div className='registration-box p-4 rounded'>
          <form onSubmit={handleSubmit} className='p-4 rounded'>
            <h3>Register as Vendor</h3>
            <div className='row'>
              <div className='col mb-3'>
                <label>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className='text-danger'>{errors.firstName}</p>
                )}
              </div>
              <div className='col mb-3'>
                <label>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className='text-danger'>{errors.lastName}</p>
                )}
              </div>
            </div>
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
              {errors.password && (
                <p className='text-danger'>{errors.password}</p>
              )}
            </div>

            <h3>Business Details</h3>
            <div className='form-group mb-3'>
              <label>Business Name</label>
              <input
                type='text'
                className='form-control'
                name='businessName'
                value={formData.businessName}
                onChange={handleChange}
              />
              {errors.businessName && (
                <p className='text-danger'>{errors.businessName}</p>
              )}
            </div>
            <div className='form-group mb-3'>
              <label>Business Description</label>
              <textarea
                className='form-control'
                name='businessDescription'
                value={formData.businessDescription}
                onChange={handleChange}
              />
              {errors.businessDescription && (
                <p className='text-danger'>{errors.businessDescription}</p>
              )}
            </div>
            <div className='row g-3'>
              <div className='col-sm-5 mb-3'>
                <label>Province</label>
                <select
                  className='form-control'
                  name='province'
                  value={formData.province}
                  onChange={handleChange}
                >
                  <option value=''>Select a province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className='text-danger'>{errors.province}</p>
                )}
              </div>
              <div className='col-sm-7 mb-3'>
                <label>City</label>
                <input
                  type='text'
                  className='form-control'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className='text-danger'>{errors.city}</p>}
              </div>
            </div>
            <div className='form-group mb-3'>
              <label>Postal Code</label>
              <input
                type='text'
                className='form-control'
                name='postalCode'
                value={formData.postalCode}
                onChange={handleChange}
              />
              {errors.postalCode && (
                <p className='text-danger'>{errors.postalCode}</p>
              )}
            </div>
            <div className='form-group mb-3'>
              <label>Business Number</label>
              <input
                type='text'
                className='form-control'
                name='businessNumber'
                value={formData.businessNumber}
                onChange={handleChange}
              />
              {errors.businessNumber && (
                <p className='text-danger'>{errors.businessNumber}</p>
              )}
            </div>

            <div className='form-group mb-3'>
              <label>Business Category</label>
              <select
                className='form-control'
                name='businessCategory'
                value={formData.businessCategory}
                onChange={handleChange}
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.businessCategory && (
                <p className='text-danger'>{errors.businessCategory}</p>
              )}
            </div>
            <div className='form-group mb-3'>
              <label>Business Subcategory</label>
              <select
                className='form-control'
                name='businessSubcategory'
                value={formData.businessSubcategory}
                onChange={handleChange}
                style={{ color: 'black' }}
              >
                <option value=''>Select a subcategory</option>
                {subcategories.length > 0 ? (
                  subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))
                ) : (
                  <option value='' disabled>
                    No subcategories found
                  </option>
                )}
              </select>
              {errors.businessSubcategory && (
                <p className='text-danger'>{errors.businessSubcategory}</p>
              )}
            </div>

            <div className='form-group mb-3'>
              <label>Business Image</label>
              <input
                type='file'
                className='form-control'
                name='businessImages'
                onChange={handleChange}
              />
              {errors.businessImage && (
                <p className='text-danger'>{errors.businessImage}</p>
              )}
            </div>
            <div className='form-group mb-3'>
              <input
                type='checkbox'
                name='agreeTerms'
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label className='ms-2'>
                I agree to the terms and conditions
              </label>
              {errors.agreeTerms && (
                <p className='text-danger'>{errors.agreeTerms}</p>
              )}
            </div>
            {errors.general && <p className='text-danger'>{errors.general}</p>}
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorRegister;
