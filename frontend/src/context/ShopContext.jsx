import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // Define values we want to share: currency and delivery fee.
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)
    // Keep track of items in the cart
    // Format: { itemId: { size: quantity } }
    const [cartItems, setCartItems] = useState({});
    // Add an item to the cart
    // Takes the item ID and size
    const addToCart = async (itemId,size) =>{
        // Make a copy of the current cart so we don’t change state directly
        let cartData = structuredClone(cartItems);
         // If the item is already in the cart
        if (cartData[itemId]){
            // If this size is already in the cart, increase its quantity
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } 
              // If this size is not in the cart yet, add it with quantity 1
            else{
                cartData[itemId][size] = 1;
            }
        }
         // If the item is not in the cart yet, add it with this size and quantity 1
        else{
            cartData[itemId] ={};
            cartData[itemId][size] = 1;
        }
         // Save the updated cart
        setCartItems(cartData)
    }
    // Watch the cart and print it every time it changes
    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    // Put all values we want to share inside one object.
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,addToCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;