import React from 'react';
import '../css/Header.css';

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <img src='/images/logo.png' alt="ServcieSpot Logo"/>
            </div>
            <nav className='nav'>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#vendor">Become a Vendor</a></li>
                </ul>
                <div className='user-profile'>
                    <img src='/images/add-user.png' alt="User" />
                </div>
            </nav>
        </header>
    );
};

export default Header;