import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import images from '../../Assets/Frontend_Assets';

const CartItems = () => {
    const { allData, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="cart-items">
        <div className="format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>

        <hr />
        {allData.map((p) => (
            cartItems[p.id] > 0 ? (
                <div>
                    <div className="items-format format-main">
                        <img src={p.image} alt="" className='product-icon' />
                        <p>{p.name}</p>
                        <p>ብር {p.new_price}</p>
                        <button className='items-quantity'>{cartItems[p.id]}</button>
                        <p>ብር {p.new_price * cartItems[p.id]}</p>
                        <img className='remove-icon' src={images.remove_icon} alt="" onClick={() => removeFromCart(p.id)} />
                    </div>
                </div>
            ) : null
        ))}
        <div className="items-down">
            <div className="items-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="items-total-item">
                        <p>Subtotal</p>
                        <p>ብር {getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="items-total-item">
                        <p>Shipping Fee</p>
                        <p>ብር {50}</p>
                    </div>
                    <hr />
                    <div className="items-total-item">
                        <h3>Total</h3>
                        <h3>ብር {getTotalCartAmount() + 50}</h3>
                    </div>
                </div>

                <button>Proceed To Checkout</button>
            </div>
            <div className="promo-code">
                <p>If you have a promo code, Enter it here</p>
                <div className="promo-box">
                    <input type="text" placeholder='Promo Code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems;