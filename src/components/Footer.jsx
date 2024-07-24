import React from 'react';
import '../css/Footer.css'; // We'll create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h2>ServiceSpot</h2>
        <p>© 2024 ServiceSpot. All rights reserved.</p>
      </div>
      <div className="footer-links">
        <a href="/Terms">Terms & Conditions</a>
        <a href="/Privacy">Privacy Policy</a>
        <a href="/Contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;