import React from 'react';
import './ProductDisplay.css';
import images from '../../Assets/Frontend_Assets';

const ProductDisplay = (props) => {
    const { product } = props;

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
                <img src={images.star} alt="" />
                <img src={images.star} alt="" />
                <img src={images.star} alt="" />
                <img src={images.star} alt="" />
                <img src={images.dull_star} alt="" />
                <p>(122)</p>
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi excepturi accusantium nostrum est quos in.
            </div>
            <div className="display-size">
                <h1>Select Size</h1>
                <div className="display-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button>Add to Cart</button>
            <p className="display-category"><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className="display-category"><span>Tags : </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay;