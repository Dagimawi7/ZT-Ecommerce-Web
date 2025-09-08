import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // Define values we want to share: currency and delivery fee.
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)

    // Put all values we want to share inside one object.
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;