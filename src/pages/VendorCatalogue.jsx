import React, { useState, useEffect } from 'react';

const VendorCatalogue = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="vendor-catalogue">
      <div className="shadow-box-heading">
        <h3>Vendor Catalogue</h3>
      </div>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <p><strong>Price:</strong> ${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorCatalogue;
