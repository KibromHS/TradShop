import { createContext, useState, useEffect } from "react";
import allData from '../Assets/Frontend_Assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    const cart = {};

    for (let i = 0; i < allData.length; i++) {
        cart[i] = 0;
    }

    return cart;
}

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState(getDefaultCart());

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();
            setProducts(data);

            if (localStorage.getItem('auth-token')) {
                const cartResponse = await fetch('http://localhost:5000/getcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                    body: ''
                });
                const cartData = await cartResponse.json();
                setCarts(cartData);
            }
        }

        fetchProducts();
    }, []);


    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        if (localStorage.getItem('auth-token')) {
            const response = await fetch('http://localhost:5000/add-to-cart', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId }),
            });
            const data = await response.json();
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        if (localStorage.getItem('auth-token')) {
            const response = await fetch('http://localhost:5000/remove-from-cart', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId }),
            });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const i in cartItems) {
            if (cartItems[i] > 0) {
                const itemInfo = allData.find(p => p.id === Number(i));
                totalAmount += itemInfo.new_price * cartItems[i];
            }
        }
        return totalAmount;
    }
    
    const contextValue = { getTotalCartAmount, allData, cartItems, addToCart, removeFromCart };

    return <ShopContext.Provider value={contextValue}>
        { children }
    </ShopContext.Provider>
}

export default ShopContextProvider;