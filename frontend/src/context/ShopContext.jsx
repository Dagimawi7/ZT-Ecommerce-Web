import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();


    // Add an item to the cart
    // Takes the item ID and size
    const addToCart = async (itemId,size) =>{
    

        if (!size){
            toast.error('Select Product Size');
            return;
        }
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


    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
               try {
                if (cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }
               } catch (error) {
                
               } 
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    // Put all values we want to share inside one object.
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;