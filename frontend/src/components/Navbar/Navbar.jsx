import React, { useContext, useState } from 'react';
import './Navbar.css';
import images from '../../Assets/Frontend_Assets';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {

    const [menu, setMenu] = useState('shop');
    const {cartItems} = useContext(ShopContext);
    const navigate = useNavigate();

  return (
    <div className="navbar">
        <Link className="nav-logo" to='/'>
            <img src={images.logo} alt="" />
            <p>TradShop</p>
        </Link>

        <ul className="nav-menu">
            <li onClick={() => setMenu('shop')}><Link to='/'>Shop</Link> {menu === 'shop' ? <hr /> : <></>}</li>
            <li onClick={() => setMenu('men')}><Link to='/men'>Men</Link> {menu === 'men' ? <hr /> : <></>}</li>
            <li onClick={() => setMenu('women')}><Link to='/women'>Women</Link> {menu === 'women' ? <hr /> : <></>}</li>
            <li onClick={() => setMenu('kids')}><Link to='/kids'>Kids</Link> {menu === 'kids' ? <hr /> : <></>}</li>
        </ul>

        <div className="nav-login-cart">
            {localStorage.getItem('auth-token') ? (
                <button onClick={() => {
                    localStorage.removeItem('auth-token');
                    navigate('/');
                }}>Logout</button>
            ) : (
                <Link to='/login'><button>Login</button></Link>
            )}
            
            <Link to='/cart'><img src={images.cart_icon} alt="" /></Link>
            <div className="couter">{Object.values(cartItems).reduce((acc, value) => acc + value, 0)}</div>
        </div>
    </div>
  )
}

export default Navbar;