import React from 'react';
import '../css/Notification.css'; // Make sure to create this CSS file for styling

const Notification = ({ message, onClose }) => (
  <div className="notification-popup">
    <p>{message}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default Notification;
