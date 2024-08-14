// VendorSideBar.jsx
import React from 'react';
import './VendorSidebar.css'; // Import the custom CSS for styling

const VendorSideBar = ({ setActiveComponent, activeComponent }) => {
  const vendorName = "Vendor"; // Replace with dynamic data as needed

  return (
    <div className="vendor-sidebar">
      <div className="vendor-sidebar-header">
        <h2>Welcome, {vendorName}!</h2>
      </div>
      <div className="vendor-sidebar-content">
        <ul>
          <li>
            <button 
              className={activeComponent === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveComponent('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              className={activeComponent === 'orders' ? 'active' : ''}
              onClick={() => setActiveComponent('orders')}
            >
              Order List
            </button>
          </li>
          <li>
            {/* <button 
              className={activeComponent === 'messages' ? 'active' : ''}
              onClick={() => setActiveComponent('messages')}
            >
              Messages
            </button> */}
          </li>
          <li>
            <button 
              className={activeComponent === 'services' ? 'active' : ''}
              onClick={() => setActiveComponent('services')}
            >
              Services
            </button>
          </li>
          <li>
            <button 
              className={activeComponent === 'profile' ? 'active' : ''}
              onClick={() => setActiveComponent('profile')}
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VendorSideBar;
