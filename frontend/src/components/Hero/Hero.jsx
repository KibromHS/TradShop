import React from 'react';
import './Hero.css';
import images from '../../Assets/Frontend_Assets';
import konjo from '../../Assets/Frontend_Assets/photo23.jpg';

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <div>
                <div className="hand-icon">
                    <p>new</p>
                    <img src={images.hand_icon} alt="" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={images.arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right">
            {/* <img src={images.hero_img} alt="" /> */}
            <img src={konjo} alt="" width={400} />
        </div>
    </div>
  )
}

export default Hero;