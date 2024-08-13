import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubCategorySidebar from '../components/SubCategorySidebar'; // Import the Sidebar component
import '../css/VendorDetailPage.css'; // Import the CSS file

const VendorDetailPage = () => {
  const { vendorId } = useParams(); // Get the vendor ID from the URL
  const [vendorDetails, setVendorDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/vendor/vendorDetails?id=${vendorId}`
        );

        // Assuming response.data is an array with one object
        if (Array.isArray(response.data) && response.data.length > 0) {
          setVendorDetails(response.data[0]); // Extract the first object
        } else {
          setError('No vendor details found.');
        }
      } catch (error) {
        console.error('Error fetching vendor details:', error);
        setError('Failed to load vendor details.');
      }
    };
    fetchVendorDetails();
  }, [vendorId]);

  const handleSubCategoryClick = (subCategoryId) => {
    // Handle the subcategory click event
    navigate(`/subcategory/${subCategoryId}`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!vendorDetails) {
    return <p>Loading vendor details...</p>;
  }

  return (
    <div>
      <Header />
      <div className='vendor-detail-container'>
        <SubCategorySidebar
          subCategories={
            vendorDetails.subcategory ? [vendorDetails.subcategory] : []
          }
          handleSubCategoryClick={handleSubCategoryClick}
        />
        <div className='vendor-detail-content'>
          <h1 className='vendor-title'>{vendorDetails.businessname}</h1>
          <img
            src={
              vendorDetails.businessImages &&
              vendorDetails.businessImages.length > 0
                ? vendorDetails.businessImages[0]
                : 'https://via.placeholder.com/150'
            }
            alt={vendorDetails.businessname}
            className='vendor-image'
          />
          <div className='vendor-info'>
            <p>
              <b>Description:</b> {vendorDetails.businessdescription}
            </p>
            <p>
              <b>Category:</b> {vendorDetails.category?.name}
            </p>
            <p>
              <b>Subcategory:</b> {vendorDetails.subcategory?.name}
            </p>
            <p>
              <b>Business Number:</b> {vendorDetails.businessnumber}
            </p>
            <p>
              <b>Email:</b> {vendorDetails.vendorid?.email}
            </p>
            <p>
              <b>Phone Number:</b> {vendorDetails.vendorid?.phonenumber}
            </p>
            <p>
              <b>Business Address:</b>{' '}
              {`${vendorDetails.city}, ${vendorDetails.province}, ${vendorDetails.postalcode}`}
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = `mailto:${vendorDetails.vendorid?.email}`)
            }
            className='contact-button'
          >
            Contact Vendor
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorDetailPage;
