import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Header.css';

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <img src='/images/logo.png' alt="ServcieSpot Logo"/>
            </div>
            <nav className='nav'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#about">About Us</a></li>
                    <li><Link to="/VendorRegister">Become a Vendor</Link></li>
                </ul>
                <div className='user-profile'>
                    <Link to = "/Login"><img src='/images/add-user.png' alt="User" /></Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;