import React, { useState, useEffect, useContext } from 'react';
import './ProductDisplay.css';
import images from '../../Assets/Frontend_Assets';
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import StarDisplay from '../StarDisplay/StarDisplay';
import StarButton from '../StarButton/StarButton';

const ProductDisplay = (props) => {
    const { product, reviews } = props;
    const { addToCart } = useContext(ShopContext);
    const [size, setSize] = useState('M');
    const navigate = useNavigate();

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0; 
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

  return (
    <div className="product-display">
        <div className="display-left">
            <div className="img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="display-img">
                <img src={product.image} alt="" className="main-img" />
            </div>
        </div>
        <div className="display-right">
            <h1>{product.name}</h1>
            <div className="display-right-star">
                <StarDisplay rating={calculateAverageRating(reviews)} />
                <p>({reviews.length})</p>
            </div>
            <div className="prices">
                <div className="price-old">
                    ብር {product.oldPrice}
                </div>
                <div className="price-new">
                    ብር {product.newPrice}
                </div>
            </div>
            <div className="display-description">
                {product.description ?? 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi excepturi accusantium nostrum est quos in.'}
            </div>
            <div className="display-size">
                <h1>Select Size</h1>
                <div className="display-sizes">
                    <div onClick={() => setSize('S')} className={size === 'S' && 'selected-size'}>S</div>
                    <div onClick={() => setSize('M')} className={size === 'M' && 'selected-size'}>M</div>
                    <div onClick={() => setSize('L')} className={size === 'L' && 'selected-size'}>L</div>
                    <div onClick={() => setSize('XL')} className={size === 'XL' && 'selected-size'}>XL</div>
                    <div onClick={() => setSize('XXL')} className={size === 'XXL' && 'selected-size'}>XXL</div>
                </div>
            </div>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            <StarButton productId={product.id} />
            {/* <p className="display-category"><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className="display-tag"><span>Tags : </span>Modern, Latest</p> */}
        </div>
    </div>
  )
}

export default ProductDisplay;