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
//import VendorDashboard from '../pages/VendorDashboard'; // Ensure correct import

import UserRegister from '../pages/UserRegister';
import Login from '../pages/Login';
import VendorDashboard from '../pages/VendorDashboard';
import { ToastContainer } from 'react-toastify';

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
