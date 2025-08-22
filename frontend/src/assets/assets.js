import ztlogo from './ztlogo.png'
import search from './search.png'
import profile from './profile.png'
import cart from './cart.png'


export const assets ={
    ztlogo, 
    search,
    profile,
    cart,
}
// we export it so we can use this assets in other files
// assets is an object that stores images under keys
export const products = [
    // we put our here 
    {
        // product 1
        _id: "aaa",
        name : "women Round Neck Cotton Top",
        description: " A light weigth",
        price: 100,
        // can display multiple images for one product
        image: [],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
    },
]