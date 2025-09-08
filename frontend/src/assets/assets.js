import ztlogo from './ztlogo.png'
import search from './search.png'
import profile from './profile.png'
import cart from './cart.png'
import menu from './menu.png'
import down from './down.png'
import board from './board.avif'
import ars from './ars.png'
import ars3 from './ars3.png'
import liv from './liv.png'
import exchange from './exchange.png'
import quality from './quality.png'
import custom from './custom.png'
import dropdown from './dropdown.png'


export const assets ={
    ztlogo, 
    search,
    profile,
    cart,
    menu,
    down,
    board,
    ars,
    ars3,
    liv,
    exchange,
    quality,
    custom,
    dropdown,
}
// we export it so we can use this assets in other files
// assets is an object that stores images under keys
export const products = [
    // we put our here 
    {
        // product 1
        _id: "Arsenal Away Jersey",
        name : "Long sleeve and short",
        description: " A light weigth blue jersey",
        price: 90,
        // can display multiple images for one product
        image: [ars],
        category: "Neutral",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
    },
    {
        // product 2
        _id: "Arsenal 3rd Jersey",
        name : "Long sleeve and short",
        description: " A light weigth blue jersey",
        price: 120,
        // can display multiple images for one product
        image: [ars3],
        category: "Neutral",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
    },
    {
        // product 2
        _id: "Liverpool Home Jersey",
        name : "Long sleeve and short",
        description: " A light weigth blue jersey",
        price: 100,
        // can display multiple images for one product
        image: [liv],
        category: "Neutral",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
    },
]