import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import VendorRegister from '../pages/VendorRegister';
import VendorDashboard from '../pages/VendorDashboard';
import UserRegister from '../pages/UserRegister';
import Login from '../pages/Login';
import About from '../pages/About';
import Terms from '../pages/Terms';
import Contact from '../pages/Contact';
import Privacy from '../pages/Privacy';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/VendorRegister' element={<VendorRegister />} />
        <Route path='/' element={<Dashboard/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/UserRegister' element={<UserRegister />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/About' element={<About />} />
        <Route path='/Terms' element={<Terms />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Privacy' element={<Privacy />} />
        <Route path='/VendorDashboard' element={<VendorDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
