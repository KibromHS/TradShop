import React from 'react';
import './Offers.css';
import images from '../../Assets/Frontend_Assets';

const Offers = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for You</h1>
            <p>only on best sellers products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={images.exclusive_img} alt="" />
        </div>
    </div>
  )
}

export default Offers;