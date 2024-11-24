import { createContext, useState } from "react";
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
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
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