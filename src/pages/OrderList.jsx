import React, { useState } from 'react';
import './Orderlist.css';

const OrderList = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty validation
    if (!productName || !productDescription || !price || !productImage) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Negative price validation
    if (parseFloat(price) < 0) {
      setErrorMessage('Price cannot be a negative value.');
      return;
    }

    // Mock API call
    setTimeout(() => {
      setSuccessMessage('Catalogue submitted successfully!');
      setErrorMessage('');
      // Clear the form
      setProductName('');
      setProductDescription('');
      setPrice('');
      setProductImage(null);
    }, 1000);
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  return (
    <div className='order-list'>
      <h3>Upload Catalogue</h3>
      <form onSubmit={handleSubmit} className='catalogue-form'>
        <div className='form-group'>
          <label htmlFor='productName'>Product Name:</label>
          <input
            type='text'
            id='productName'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='productDescription'>Product Description:</label>
          <textarea
            id='productDescription'
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows='4'
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='productImage'>Upload Image:</label>
          <input
            type='file'
            id='productImage'
            onChange={handleImageChange}
            required
          />
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      {successMessage && <p className='success-message'>{successMessage}</p>}
    </div>
  );
};

export default OrderList;
