import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { products as initialProducts } from "../assets/assets";

export const ShopContext = createContext();

const backendUrl = "http://localhost:4000";

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;

    // Core State - deep clone the assets to prevent reference issues
    const [products, setProducts] = useState(JSON.parse(JSON.stringify(initialProducts)));
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({});

    // Auth & User State
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null); // { name, email, role, membershipActive }

    // Promo State
    const [promoCode, setPromoCode] = useState("");
    const [discountData, setDiscountData] = useState({ discount: 0, type: "", value: 0 });

    const navigate = useNavigate();

    // Fetch Products from Backend
    const getProductsData = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/product/list`);
            const data = await response.json();
            if (data.success && data.products.length > 0) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log("Could not fetch products from backend. Falling back to local assets.", error);
        }
    };

    // Load token and profile on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            fetchUserProfile(storedToken);
        }
        getProductsData();
    }, []);

    // Fetch user profile (to get membership status)
    const fetchUserProfile = async (authToken) => {
        try {
            const response = await fetch(`${backendUrl}/api/user/profile`, {
                method: "GET",
                headers: { "token": authToken }
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
            } else {
                // Invalid token
                setToken("");
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Derived Membership State
    const isMember = user?.membershipActive === true;
    const effectiveDeliveryFee = isMember ? 0 : delivery_fee; // Free shipping for members

    // Add an item to the cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
        // Re-validate promo if one is applied
        if (promoCode) {
            setDiscountData({ discount: 0, type: "", value: 0 }); // Reset discount until re-validated
            toast.info("Cart updated. Please re-apply your promo code.");
            setPromoCode("");
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        // Force re-validation of promo when cart changes
        if (promoCode) {
            setDiscountData({ discount: 0, type: "", value: 0 });
            setPromoCode("");
            toast.info("Cart updated. Please re-apply your promo code.");
        }
    }

    const getCartSubtotal = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        // Use member pricing if applicable
                        const priceToUse = (isMember && itemInfo.memberPrice) ? itemInfo.memberPrice : (itemInfo.salePrice || itemInfo.price);
                        totalAmount += priceToUse * cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalAmount;
    }

    // Apply Promo Code Logic
    const applyPromoCode = async (code) => {
        if (!token) {
            toast.error("Please login to use promo codes");
            return false;
        }

        const subtotal = getCartSubtotal();
        if (subtotal === 0) {
            toast.error("Cart is empty");
            return false;
        }

        try {
            const response = await fetch(`${backendUrl}/api/promo/validate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({
                    code,
                    cartItems,
                    cartTotal: subtotal
                })
            });
            const data = await response.json();

            if (data.success) {
                setPromoCode(data.promoCode);
                setDiscountData({ discount: data.discount, type: data.type, value: data.value });
                toast.success(data.message);
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    const removePromoCode = () => {
        setPromoCode("");
        setDiscountData({ discount: 0, type: "", value: 0 });
        toast.success("Promo code removed");
    };

    // Put all values we want to share inside one object.
    const value = {
        products, currency, delivery_fee: effectiveDeliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartSubtotal, // Replaces getCartAmount
        backendUrl,
        token, setToken,
        user, setUser, fetchUserProfile, isMember,
        promoCode, discountData, applyPromoCode, removePromoCode,
        navigate,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;