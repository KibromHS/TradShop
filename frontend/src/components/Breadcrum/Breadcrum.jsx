import React from 'react';
import './Breadcrum.css';
import images from '../../Assets/Frontend_Assets';

const Breadcrum = (props) => {
    const { product } = props;

  return (
    <div className="breadcrum">
        HOME <img src={images.arrow_icon} alt="" /> SHOP <img src={images.arrow_icon} alt="" />
    </div>
  )
}

export default Breadcrum;