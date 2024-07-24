import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './TermModule.css'; // Custom CSS file for additional styles

const Terms = () => {
  return (
    <div className="terms-page">
      <Header />
          <div className="container mt-4 mb-4" style={{ maxWidth: '1600px' }}>
          <div className="p-4 rounded bg-light">
            <h1 className="terms-header">Terms and Conditions</h1>
          <br /><br />
          <p>
            Welcome to ServiceSpot. If you continue to browse and use this website, 
            you are agreeing to comply with and be bound by the following terms and 
            conditions of use, which together with our privacy policy govern 
            ServiceSpot's relationship with you in relation to this website.
          </p>
          <h4>1. Terms</h4>
          <p>
            By accessing Service Spot, you are agreeing to be bound by 
            Terms and Conditions of Use and agree that you are responsible for 
            the agreement with any applicable local laws. If you disagree with any
            of these terms, you are prohibited from accessing this site.
            The materials contained in this Website are protected by copyright and trademark law.
          </p>
          <h4>2. Use License</h4>
          <p>
            Permission is granted to temporarily download one copy of the materials on 
            ServiceSpot's Website for personal, non-commercial transitory viewing only. 
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display;</li>
            <li>Attempt to decompile or reverse engineer any software contained on Service Spot's Website;</li>
            <li>Remove any copyright or other proprietary notations from the materials;</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p>
            This will let ServiceSpot terminate upon violations of any of these restrictions.
            Upon termination, your viewing right will also be terminated and you should destroy 
            any downloaded materials in your possession whether it is printed or electronic format.
          </p>
          <h4>3. Disclaimer</h4>
          <p>
            All the materials on Service Spot's Website are provided "as is". Service Spot makes no warranties, 
            may it be expressed or implied, therefore negates all other warranties. Furthermore, Service Spot does 
            not make any representations concerning the accuracy or reliability of the use of the materials on its 
            Website or otherwise relating to such materials or any sites linked to this Website.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
