import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import VendorRegister from '../pages/VendorRegister';
import CategoryPage from '../pages/CategoryPage';
import Profile from '../pages/Profile'; // Import Profile component
import About from '../pages/About';
import Contact from '../pages/Contact';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import SubCategoryPage from '../pages/SubCategoryPage';
import Chat from '../pages/Chat'; // Import Chat component

//import VendorDashboard from '../pages/VendorDashboard'; // Ensure correct import

import UserRegister from '../pages/UserRegister';
import Login from '../pages/Login';
import VendorDashboard from '../pages/VendorDashboard';
import { ToastContainer } from 'react-toastify';
import VendorDetailPage from '../pages/VendorDetailPage';

function App() {
  const userId = '66bab662ffdb6718f95c0197'; // Replace with actual user ID
  const recipientId = '6684ca9591be59c0b357422e'; // Replace with actual recipient ID
  const recipientType = 'Vendor'; // Replace with 'Vendor' if chatting with a vendor
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path='/VendorRegister' element={<VendorRegister />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/UserRegister' element={<UserRegister />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/Profile' element={<Profile />} />{' '}
        {/* Add Profile route */}
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Terms' element={<Terms />} />
        <Route path='/Privacy' element={<Privacy />} />
        <Route path='/VendorDashboard' element={<VendorDashboard />} />
        <Route path='/categories/:name' element={<CategoryPage />} />
        <Route
          path='/subcategory/:subCategoryId'
          element={<SubCategoryPage />}
        />{' '}
        {/* Add SubCategoryPage route */}
        <Route path='/VendorDetailPage' element={<VendorDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
