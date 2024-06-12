import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorRegister from '../pages/VendorRegister';
import Dashboard from '../pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/VendorRegister' element={<VendorRegister />} />
        <Route path='/Dashboard' element={<Dashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
