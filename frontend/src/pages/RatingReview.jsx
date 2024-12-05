import React, { useState, useEffect } from 'react';
import './css/RatingReview.css';
import { useParams } from 'react-router-dom';

const RatingReview = () => {
  const [rating, setRating] = useState(0);  // Rating from 1 to 5
  const [review, setReview] = useState('');  // Text review
  const [reviewsList, setReviewsList] = useState([]);  // List of reviews
  const { productId } = useParams();  // Extract productId from URL params

  // Fetch reviews from the backend when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reviews/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setReviewsList(data);  // Set the fetched reviews
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [productId]);

  // Handle rating change (from 1 to 5)
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Handle text review input change
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // Submit the review to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating > 0 && review.trim()) {
      const reviewData = {
        productId,
        rating,
        reviewText: review,
      };

      try {
        // POST request to send the new review to the backend
        const response = await fetch('http://localhost:5000/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        });

        if (response.ok) {
          const newReview = await response.json();
          // If review is successfully posted, update the list
          setReviewsList([...reviewsList, newReview.review]);
          setReview('');
          setRating(0);
        } else {
          console.error('Failed to submit review');
        }
      } catch (error) {
        alert('Error submitting review:', error);
      }
    } else {
      alert('Please provide both rating and review');
    }
  };

  return (
    <div className="rating-review">
      <h2>Rate this Product</h2>

      <div className="rating">
        <p>Rating: </p>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${rating >= value ? 'filled' : ''}`}
            onClick={() => handleRatingChange(value)}
          >
            &#9733; {/* Star character */}
          </span>
        ))}
      </div>

      <div className="review">
        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={handleReviewChange}
        ></textarea>
      </div>

      <button onClick={handleSubmit}>Submit Review</button>

      <div className="reviews">
        <h3>Reviews:</h3>
        {reviewsList.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviewsList.map((item, index) => (
            <div key={index} className="review-item">
              <p><strong>Rating: {item.rating} stars</strong></p>
              <p>{item.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RatingReview;
