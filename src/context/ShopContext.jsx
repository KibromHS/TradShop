import { createContext } from "react";
import allData from '../Assets/Frontend_Assets/all_product'

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
    const contextValue = { allData };
    console.log(contextValue);

    return <ShopContext.Provider value={contextValue}>
        { children }
    </ShopContext.Provider>
}

export default ShopContextProvider;