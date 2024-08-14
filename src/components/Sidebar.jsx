// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ firstName, lastName }) => (
  <div className="sidebar">
    <h1>Welcome {firstName} {lastName}</h1>
    <ul>
      <li><Link to="/Profile">My Profile</Link></li>
      {/* <li><Link to="/Inbox">My Inbox</Link></li> */}
      {/* <li><Link to="/Bookings">My Bookings</Link></li> */}
      <li><Link to="/Contact">Get Help</Link></li>
    </ul>
  </div>
);

export default Sidebar;