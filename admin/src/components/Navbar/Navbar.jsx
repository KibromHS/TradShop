import React from 'react';
import './Navbar.css';
import images from '../../assets';

const Navbar = () => {
  return (
    <div className="navbar">
        <div className='nav-logo'>
            <img src={images.logo} alt="" />
            <div className='nav-logo-name'>
                <p>TradShop</p>
                <p className='span'>Admin</p>
            </div>
        </div>
        
        <img src={images.navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar;