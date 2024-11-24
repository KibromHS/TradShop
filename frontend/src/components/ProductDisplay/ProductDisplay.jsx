import React, { useContext } from 'react';
import './ProductDisplay.css';
import images from '../../Assets/Frontend_Assets';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

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
                    ብር {product.old_price}
                </div>
                <div className="price-new">
                    ብር {product.new_price}
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
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            <p className="display-category"><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className="display-tag"><span>Tags : </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay;