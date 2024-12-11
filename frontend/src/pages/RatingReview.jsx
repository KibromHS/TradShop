import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './css/RatingReview.css';

const ReviewPage = () => {
  const { productId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const usedRating = query.get('rating');
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  
  useEffect(() => {
    setRating(usedRating);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId , rating, text: review }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Review submitted!');
        navigate(`/product/${productId}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Rate and Review</h3>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'selected' : ''}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default ReviewPage;
