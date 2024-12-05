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
            <a className="hero-latest-btn" href='#new-collections'>
                <div>Latest Collection</div>
                <img src={images.arrow_icon} alt="" />
            </a>
        </div>
        <div className="hero-right">
            {/* <img src={images.hero_img} alt="" /> */}
            <img src={konjo} alt="" width={400} />
        </div>
    </div>
  )
}

export default Hero;