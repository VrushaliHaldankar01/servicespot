import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Convert user to boolean
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState); // Simplify state toggle
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="logo">
          <img src="/images/logo.png" alt="ServiceSpot Logo" />
        </div>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About Us</Link></li>
            <li><Link to="/VendorDashboard">Vendor</Link></li>
            {!isLoggedIn && <li><Link to="/VendorRegister">Become a Vendor</Link></li>}
            {isLoggedIn ? (
              <>
                <li><Link to="/Profile">My Profile</Link></li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    <img src="/images/exit.png" alt="Logout" />
                  </button>
                </li>
              </>
            ) : (
              <div className="user-profile">
                <Link to="/Login"><img src="/images/add-user.png" alt="User" /></Link>
              </div>
            )}
          </ul>
        </nav>
        <button className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </header>
    </div>
  );
}

export default Header;
