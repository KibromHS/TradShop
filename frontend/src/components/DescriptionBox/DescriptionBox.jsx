import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className="description-box">
        <div className="box-navigator">
            <div className="nav-box">Reviews (122)</div>
            {/* <div className="nav-box fade">Reviews (122)</div> */}
        </div>
        <div className="description">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum earum dignissimos deserunt ipsa minima animi officiis voluptatum, non dicta, nostrum et? Voluptas veritatis, temporibus natus voluptatibus eveniet cupiditate dicta animi.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, dolorum rerum. Nostrum voluptatibus ducimus culpa sequi iure corrupti, vero pariatur!</p>
        </div>
    </div>
  )
}

export default DescriptionBox;