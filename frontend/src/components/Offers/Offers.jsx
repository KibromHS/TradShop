import React from 'react';
import './Offers.css';
import images from '../../Assets/Frontend_Assets';
import konjo2 from '../../Assets/Frontend_Assets/photo25.jpg';

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
            <img src={konjo2} alt="" />
        </div>
    </div>
  )
}

export default Offers;