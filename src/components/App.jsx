import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorRegister from '../pages/VendorRegister';
import Dashboard from '../pages/Dashboard';
import UserRegister from '../pages/UserRegister';
import Login from '../pages/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/VendorRegister' element={<VendorRegister />} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/UserRegister' element={<UserRegister />} />
        <Route path='/Login' element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
