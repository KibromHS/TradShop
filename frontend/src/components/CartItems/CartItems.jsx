import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import images from '../../Assets/Frontend_Assets';

const CartItems = () => {
    const { allData, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');

    const amount = `${getTotalCartAmount() + 100}`;

    const checkout = async () => {
        try {
            const response = await fetch('http://localhost:5000/create-payment-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: finalTotal })
            });

            const data = await response.json();
    
            if (data.success) {
                window.location.href = data.paymentUrl;
              } else {
                throw new Error("Failed to create payment session");
              }
        } catch (e) {
            alert(e.message)
        }
        
    }

    const handleApplyPromo = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/validate-promo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ promoCode }),
          });
    
          const data = await response.json();
    
          if (data.valid) {
            setError('');
            // Apply discount
            if (data.type === 'percentage') {
              setDiscount((amount * data.discount) / 100);
            } else if (data.type === 'fixed') {
              setDiscount(data.discount);
            }
          } else {
            setError(data.message);
            setDiscount(0);
          }
        } catch (err) {
          console.error('Error validating promo code:', err);
          setError('Something went wrong');
        }
    };

    const finalTotal = amount - discount;

  return (
    <div className="cart-items">
        <div className="format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Size</p>
            <p>Total</p>
            <p>Remove</p>
        </div>

        <hr />
        {allData.map((p) => (
            cartItems[p.id] > 0 ? (
                <div key={p.id}>
                    <div className="items-format format-main">
                        <img src={p.image} alt="" className='product-icon' />
                        <p>{p.name}</p>
                        <p>ብር {p.newPrice}</p>
                        <button className='items-quantity'>{cartItems[p.id]}</button>
                        <button className="items-quantity">{p.size}</button>
                        <p>ብር {p.newPrice * cartItems[p.id]}</p>
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
                        <h3>ብር {getTotalCartAmount() + 100}</h3>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {discount > 0 && <p>Discount: ብር -{discount.toFixed(2)}</p>}
                    {discount > 0 && <h3>Final Total: ብር {finalTotal}</h3>}
                </div>

                <button onClick={checkout}>Proceed To Checkout</button>
            </div>
            <div className="promo-code">
                <p>If you have a promo code, Enter it here</p>
                <div className="promo-box">
                    <input type="text" placeholder='Promo Code' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <button onClick={handleApplyPromo}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems;