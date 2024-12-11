import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ reviews, loading }) => {
  return (
    <div className="description-box">
        <div className="box-navigator">
            <div className="nav-box">Reviews ({reviews.length})</div>
            {/* <div className="nav-box fade">Reviews (122)</div> */}
        </div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
          <div className="description">
            <div className='reviewer'>
              <div>{review.username[0]}</div>
              <p>{review.username}</p>
            </div>
            <p>{review.text}</p>
          </div>
        ))) : (
          <div className='description'><p>No reviews yet.</p></div>
        )}
    </div>
  )
}

export default DescriptionBox;