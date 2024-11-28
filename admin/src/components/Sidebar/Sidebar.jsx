import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import images from '../../assets';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to='/add-product' style={{textDecoration: 'none'}}>
            <div className="sidebar-item">
                <img src={images.productCart} alt='' />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to='/list-product' style={{textDecoration: 'none'}}>
            <div className="sidebar-item">
                <img src={images.productList} alt='' />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar;