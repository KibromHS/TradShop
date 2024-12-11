import React from 'react';

const StarDisplay = ({ rating, maxStars = 5 }) => {
  // Create an array for the star ratings (e.g., [1, 2, 3, 4, 5])
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            fontSize: '24px',
            color: star <= rating ? '#FF4141' : '#CCCCCC',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarDisplay;
