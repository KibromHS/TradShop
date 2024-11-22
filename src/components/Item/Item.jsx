import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, image, name, oldPrice, newPrice }) => {
  return (
    <Link to={`/product/${id}`}>
        <div className='item'>
            <img src={image} alt="" />
            <p>{name}</p>
            <div className="prices">
                <div className="old-price">ብር {oldPrice}</div>
                <div className="new-price">ብር {newPrice}</div>
            </div>
        </div>
    </Link>
  )
}

export default Item;