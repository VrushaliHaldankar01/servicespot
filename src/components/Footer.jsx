import React from 'react';
import '../css/Footer.css'; // We'll create this CSS file for styling
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-info">
          <h2>ServiceSpot</h2>
          <p>© 2024 ServiceSpot. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <Link to="/Terms">Terms & Conditions</Link>
          <Link to="/Privacy">Privacy Policy</Link>
          <Link to="/Contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
