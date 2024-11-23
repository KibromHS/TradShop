import React from 'react';
import './Footer.css';
import images from '../../Assets/Frontend_Assets';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={images.footer_logo} alt="" />
            <p>TradShop</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="social-icons">
            <div className="icons-container">
                <img src={images.instagram} alt="" />
            </div>
            <div className="icons-container">
                <img src={images.whatsapp} alt="" />
            </div>
            <div className="icons-container">
                <img src={images.pinterest} alt="" />
            </div>
        </div>

        <div className="copyright">
            <hr />
            <p>Copyright &copy; 2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer;