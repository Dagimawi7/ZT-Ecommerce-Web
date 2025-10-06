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
import cross from './cross.png'
import ars2 from './ars2.webp'
import star from './star.png'
import hstar from './hstar.png'
import bin from './bin.png'
import stripe from './stripe.png'
import credit from './credit.png'
import paypal from './paypal.png'
import klarna from './klarna.svg'
import google from './google.png'
import about from './about.avif'
import Contact from './Contact.jpeg'
import image1 from './image1.png'
import image2 from './image2.png'
import image3 from './image3.png'
import image4 from './image4.png'



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
    cross,
    ars2,
    star,
    hstar,
    bin,
    stripe,
    credit,
    paypal,
    klarna,
    google,
    about,
    Contact,
    image1,
    image2,
    image3,
    image4,
}
// we export it so we can use this assets in other files
// assets is an object that stores images under keys
export const products = [
    // we put our here 
    {
        // product 1
        _id: "Arsenal Away Jersey",
        name : "Arsenal Away Jersey",
        description: " A light weigth blue jersey",
        price: 90,
        // can display multiple images for one product
        image: [ars, ars2],
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