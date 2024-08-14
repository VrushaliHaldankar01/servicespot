import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/VendorDetailPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VendorDetailPage = () => {
  const { vendorId } = useParams(); // Get vendor ID from URL params
  const [vendor, setVendor] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Fetch vendor details using vendorId
    axios
      .get(`http://localhost:4000/vendor/vendorDetails?id=${vendorId}`)
      .then((response) => {
        setVendor(response.data[0]); // Assuming response is an array, get the first item
      })
      .catch((error) => {
        console.error('Error fetching vendor details:', error);
      });
  }, [vendorId]);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  const handleViewSubCategories = () => {
    console.log(vendor.subcategoryid);
    navigate(`/subcategory/${vendor.subcategoryid}`); // Navigate to the specific subcategory page
  };

  return (
    <>
      <Header />
      <div className="vendor-detail-page">
        <button 
          className="view-subcategories-button" 
          onClick={handleViewSubCategories}
        >
          View Sub-Categories
        </button>
        <div className="vendor-info-card">
          <div className="business-image">
            <img src={vendor.businessImages[0]} alt={vendor.businessname} />
            <h2>{vendor.businessname}</h2>
          </div>
          <div className="vendor-details">
            <div className="vendor-column">
              <p><strong>Vendor name:</strong> {`${vendor.vendorid.firstName} ${vendor.vendorid.lastName}`}</p>
              <p><strong>Category:</strong> {vendor.categoryname}</p>
              <p><strong>Subcategory:</strong> {vendor.subcategoryname}</p>
              <p><strong>Email:</strong> {vendor.vendorid.email}</p>
              <p><strong>Contact:</strong> {vendor.vendorid.phonenumber}</p>
            </div>
            <div className="business-column">
              <p><strong>Business Name:</strong> {vendor.businessname}</p>
              <p><strong>Description:</strong> {vendor.businessdescription}</p>
              <p><strong>Business Number:</strong> {vendor.businessnumber}</p>
              <p><strong>Address:</strong> {`${vendor.city}, ${vendor.province}, ${vendor.postalcode}`}</p>
            </div>
          </div>
          <a href={`mailto:${vendor.vendorid.email}`} className="contact-vendor-button">
            Contact Vendor
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorDetailPage;
