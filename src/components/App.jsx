import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import VendorRegister from '../pages/VendorRegister';
import CategoryPage from '../pages/CategoryPage';
import Profile from '../pages/Profile';  // Import Profile component


import UserRegister from '../pages/UserRegister';
import Login from '../pages/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/VendorRegister' element={<VendorRegister />} />
        <Route path='/' element={<Dashboard/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/UserRegister' element={<UserRegister />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/Profile' element={<Profile />} />  {/* Add Profile route */}

      </Routes>
    </Router>
  );
}

export default App;
