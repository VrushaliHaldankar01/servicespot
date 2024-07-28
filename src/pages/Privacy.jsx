import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div>
      <Header />
      <div className='container mt-4 mb-4' style={{ maxWidth: '1600px' }}>
        <div className='p-4 rounded'>
          <h1>Privacy Policy</h1>
          <br /><br />
          <p>
           Welcome to ServiceSpot's Privacy Policy. Your privacy is important to us. 
           This policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <h4>1. Information We Collect</h4>
          <p>We may collect personal information from you when you visit our website,
             register an account, or use our services. This information may include:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, etc.
            </li>
            <li>
              <strong>Usage Data:</strong> Browser type, IP address, pages visited, etc.
            </li>
          </ul>
          <h4>2. How We Use Your Information</h4>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>To provide and maintain our Site</li>
            <li>To notify you about changes to our Site</li>
            <li>To allow you to participate in interactive features of our Site when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Site</li>
            <li>To monitor the usage of our Site</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
          <h4>3. Sharing Your Information</h4>
          <p>We may share your personal information with third parties in the following circumstances:</p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your personal information with service providers 
              to monitor and analyze the use of our Site, to contact you.
            </li>
            <li>
              <strong>For Business Transfers:</strong> We may share or transfer your personal information 
              in connection with, or during negotiations of, any merger, sale of company assets, financing,
               or acquisition of all or a portion of our business to another company.
            </li>
            <li>
              <strong>With Affiliates:</strong> We may share your information with our affiliates,
               in which case we will require those affiliates to honor this Privacy Policy.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.
            </li>
          </ul>
          <h4>4. Security of Your Information</h4>
          <p>
            The security of your personal information is important to us, but remember that no method
            of transmission over the internet, or method of electronic storage is 100% secure.
            While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
          
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
