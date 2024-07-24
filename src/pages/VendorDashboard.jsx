import React, { useState } from 'react';
import OrderList from './OrderList';
import Messages from './Messages';
import Services from './Services';
import VendorProfile from './VendorProfile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './VendorDashboard.css';
import Sidebar from './SideBar'; // Correctly import the Sidebar component

const VendorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [services, setServices] = useState([
    { name: 'Plumbing Service', description: 'Your partner in plumbing, ensuring a lifetime of comfort and hassle-free living.', price: 150 },
    { name: 'Electrical Service', description: 'Expert electricians to address all your electrical needs with precision and safety.', price: 200 },
    { name: 'Cleaning Service', description: 'Professional cleaners who ensure your space is spotless and hygienic.', price: 100 },
  ]);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(true);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(true);
  const [isRequestsOpen, setIsRequestsOpen] = useState(true);
  const [date, setDate] = useState(new Date()); // State for selected date

  // Static list of available dates
  const availableDates = [
    '2024-07-25',
    '2024-07-27',
    '2024-07-29',
    '2024-08-01',
    '2024-08-15',
    '2024-08-20'
  ];

  // Function to check if a date is available
  const isAvailableDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return availableDates.includes(formattedDate);
  };

  const toggleSection = (section) => {
    switch (section) {
      case 'catalogue':
        setIsCatalogueOpen(!isCatalogueOpen);
        break;
      case 'appointments':
        setIsAppointmentsOpen(!isAppointmentsOpen);
        break;
      case 'requests':
        setIsRequestsOpen(!isRequestsOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="vendor-dashboard">
      <Header />
      <div className="dashboard-container">
        <Sidebar setActiveComponent={setActiveComponent} /> {/* Use the custom Sidebar component */}
        <div className="dashboard-section">
          {activeComponent === 'dashboard' && (
            <>
              <div className="vendor-catalogue">
                <div className="shadow-box-heading" onClick={() => toggleSection('catalogue')}>
                  <h3>My Services</h3>
                  <span className="toggle-icon">{isCatalogueOpen ? '▲' : '▼'}</span>
                </div>
                {isCatalogueOpen && (
                  <div className="services-card-container">
                    {services.map((service, index) => (
                      <div className="service-card" key={index}>
                        <h4 className="service-name">{service.name}</h4>
                        <p className="service-description">{service.description}</p>
                        <p className="service-price"><strong>Price:</strong> ${service.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="dashboard">
                <div className="content">
                  <div className="appointments-overview">
                    <div className="shadow-box-heading" onClick={() => toggleSection('appointments')}>
                      <h3>Booking Calendar</h3>
                      <span className="toggle-icon">{isAppointmentsOpen ? '▲' : '▼'}</span>
                    </div>
                    {isAppointmentsOpen && (
                      <>
                        <Calendar
                          onChange={setDate}
                          value={date}
                          tileClassName={({ date }) => isAvailableDate(date) ? 'highlighted-date' : null}
                        />
                        <div className="appointment-requests">
                          <div className="shadow-box-heading" onClick={() => toggleSection('requests')}>
                            <h3>Appointment Requests</h3>
                            <span className="toggle-icon">{isRequestsOpen ? '▲' : '▼'}</span>
                          </div>
                          {isRequestsOpen && (
                            <div className="appointment-requests-content">
                              {/* Add appointment requests here */}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeComponent === 'orders' && <OrderList />}
          {activeComponent === 'messages' && <Messages />}
          {activeComponent === 'services' && <Services onUpdate={() => { /* Optional: Handle update logic */ }} />}
          {activeComponent === 'profile' && <VendorProfile />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
