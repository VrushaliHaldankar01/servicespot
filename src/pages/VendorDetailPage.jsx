import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';



const VendorDetailPage = () => {
  const { vendorId } = useParams(); // Get the vendor ID from the URL
  const [vendorDetails, setVendorDetails] = useState(null);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        // const response = await axios.get(`http://localhost:4000/vendor/vendorDetails?id=${vendorId}`);
        const response = await axios.get(`http://localhost:4000/vendor/vendorDetails?id=66aaaf26c399470ba29358f3`);
        setVendorDetails(response.data);
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  if (!vendorDetails) {
    return <p>Loading vendor details...</p>;
  }

  return (
    <div>
      <Header />
      <div className='vendor-detail-page'>
        <h1>{vendorDetails.businessname}</h1>
        <img
          src={vendorDetails.businessImages && vendorDetails.businessImages.length > 0
            ? vendorDetails.businessImages[0]
            : 'https://via.placeholder.com/150'}
          alt={vendorDetails.businessname}
        />
        <p><b>Description:</b> {vendorDetails.businessdescription}</p>
        <p><b>Email:</b> {vendorDetails.vendorid.email}</p>
        <p><b>Business Address:</b> {`${vendorDetails.city}, ${vendorDetails.province}, ${vendorDetails.postalcode}`}</p>
        <p><b>Phone Number:</b> {vendorDetails.vendorid.phonenumber}</p>

        <h2>Catalogue</h2>
        {vendorDetails.catalogue && vendorDetails.catalogue.length > 0 ? (
          <ul>
            {vendorDetails.catalogue.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No catalogue available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VendorDetailPage;
