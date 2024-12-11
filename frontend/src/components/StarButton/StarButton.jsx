import React from 'react';
import { Link } from 'react-router-dom';

const StarButton = ({ productId, maxStars = 5 }) => {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {stars.map((star) => (
        <Link
          key={star}
          to={`/product/${productId}/review?rating=${star}`}
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <span
            style={{
              fontSize: '54px',
              color: '#CCCCCC',
            }}
          >
            ★
          </span>
        </Link>
      ))}
    </div>
  );
};

export default StarButton;
