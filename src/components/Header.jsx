import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] =useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem("user");
      if(user) {
        setIsLoggedIn(true);
      }
    }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };
    return (
        <header className='header'>
            <div className='logo'>
                <img src='/images/logo.png' alt="ServcieSpot Logo"/>
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {/* <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#about">About Us</a></li>
                    <li><Link to="/VendorRegister">Become a Vendor</Link></li>
               {!isLoggedIn ? (
                <div className='user-profile'>
                <Link to = "/Login"><img src='/images/add-user.png' alt="User" /></Link>
            </div>
               ) : (
                <div className='user-profile'>
                <Link to="/user-dashboard"><img src='/images/user-profile.png' alt="Profile" /></Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
               )}               
                </ul> */}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#about">About Us</a></li>
                    {!isLoggedIn && <li><Link to="/VendorRegister">Become a Vendor</Link></li>}
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/Profile">My Profile</Link></li>
                            <li><button onClick={handleLogout} className="logout-button"><img src= '/images/exit.png' alt="logout"/></button></li>
                        </>
                    ) : (
                        <div className='user-profile'>
                            <Link to="/Login"><img src='/images/add-user.png' alt="User" /></Link>
                        </div>
                    )}
                </ul>
            </nav>
            <button className='hamburger' onClick={toggleMenu}>
        <i className="fas fa-bars"></i> 
      </button>
        </header>
    );
};

export default Header;