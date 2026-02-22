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
import realmadrid from './realmadrid.jpg'



export const assets = {
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
    {
        _id: "Pro_Elite_Firm_Ground_Cleats",
        name: "Pro Elite Firm Ground Cleats",
        description: "Professional grade soccer cleats designed for maximum agility and speed on firm grass.",
        price: 220,
        image: ["https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop"],
        Category: "Men",
        subCategory: "Footwear",
        sizes: ["8", "9", "10", "11", "12"],
        bestseller: true,
        date: 1716634345448,
        salePrice: 180,
        onSale: true,
        featured: true,
        earlyAccess: false,
        memberPrice: 170
    },
    {
        _id: "Madrid_Home_Authentic_Jersey",
        name: "Madrid Home Authentic Jersey",
        description: "Official white home jersey, crafted with breathable moisture-wicking technology.",
        price: 130,
        image: ["https://www.thesoccerstore.com/media/catalog/product/cache/276475ec3ca32366d643b8dc06b4c45e/i/x/ix8095_b2b9212_pdp.jpg"],
        Category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        date: 1716634345449,
        salePrice: null,
        onSale: false,
        featured: true,
        earlyAccess: false,
        memberPrice: 115
    },
    {
        _id: "Catalunya_Away_Kit",
        name: "Catalunya Away Kit",
        description: "Vibrant yellow away kit jersey, designed for the ultimate fan experience.",
        price: 90,
        image: ["https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1121588000&iset=0100&iindex=0007&retBlank=1x1&bg=f6f6f6"],
        Category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: false,
        date: 1716634345450,
        salePrice: 75,
        onSale: true,
        featured: false,
        earlyAccess: false,
        memberPrice: 70
    },
    {
        _id: "Grip_Match_Socks",
        name: "Grip+ Match Socks",
        description: "High-performance compression socks with anti-slip grip technology on the sole.",
        price: 35,
        image: ["https://aztecasoccer.com/cdn/shop/products/TRUsox-3.0-Mid-Calf-Cushioned-Grip-Socks-White-Black-Main.jpg?v=1647547598&width=1406"],
        Category: "Unisex",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        date: 1716634345451,
        salePrice: null,
        onSale: false,
        featured: false,
        earlyAccess: false,
        memberPrice: 28
    },
    {
        _id: "Elite_Training_Tracksuit",
        name: "Elite Training Tracksuit",
        description: "Lightweight, aerodynamic tracksuit perfect for pre-game warmups and cold weather training.",
        price: 110,
        image: ["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSGpoVtSrGiiRAeJ6YNaI0AA9MgL9T-rm86PoK0OCK1-vj9BpEERO7e87_l4TOR8r7a-C4Hfpnr5VyHS6sNpbXAadu4nQ362_mLMwyKtRCvUVVh0ZwzuooC"],
        Category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        date: 1716634345452,
        salePrice: 85,
        onSale: true,
        featured: true,
        earlyAccess: false,
        memberPrice: 80
    },
    {
        _id: "Phantom_Pro_Goalkeeper_Gloves",
        name: "Phantom Pro Goalkeeper Gloves",
        description: "Professional match gloves featuring 4mm latex for superior grip and finger protection spines.",
        price: 150,
        image: ["https://zeegoalkeepergloves.com/wp-content/uploads/2024/10/ZEE-Venom-Phantom-Goalkeeper-Gloves-3.png"],
        Category: "Accessories",
        subCategory: "Accessories",
        sizes: ["8", "9", "10", "11"],
        bestseller: true,
        date: 1716634345453,
        salePrice: null,
        onSale: false,
        featured: true,
        earlyAccess: true,
        memberPrice: 130
    },
    {
        _id: "UCL_Official_Match_Ball",
        name: "UCL Official Match Ball",
        description: "Seamless match ball used in the greatest European nights. Unpredictable flight, precision control.",
        price: 160,
        image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofRP097K-8mD-Y-zInWPCSzfjjSBj6dwV8A&s"],
        Category: "Accessories",
        subCategory: "Accessories",
        sizes: ["5"],
        bestseller: true,
        date: 1716634345454,
        salePrice: 120,
        onSale: true,
        featured: true,
        earlyAccess: false,
        memberPrice: 110
    },
    {
        _id: "Agility_Training_Cones",
        name: "Agility Training Cones",
        description: "High-visibility, durable training cones for building speed, agility, and quick direction changes.",
        price: 25,
        image: ["https://quickplaysport.us/cdn/shop/files/2_7e0058de-1924-448e-97fc-e70913ee8f9a_412x412.jpg?v=1736521769"],
        Category: "Accessories",
        subCategory: "Accessories",
        sizes: ["One Size"],
        bestseller: false,
        date: 1716634345455,
        salePrice: null,
        onSale: false,
        featured: false,
        earlyAccess: false,
        memberPrice: 20
    },
    {
        _id: "Carbon_Fiber_Shin_Guards",
        name: "Carbon Fiber Shin Guards",
        description: "Ultra-lightweight carbon fiber shin guards offering maximum impact protection without the bulk.",
        price: 60,
        image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCbY5PvgupGdlA0gIffy74NzzYB7o3vHSdiA&s"],
        Category: "Accessories",
        subCategory: "Accessories",
        sizes: ["S", "M", "L"],
        bestseller: false,
        date: 1716634345456,
        salePrice: 45,
        onSale: true,
        featured: false,
        earlyAccess: false,
        memberPrice: 40
    },
    {
        _id: "Astro_Turf_Legend_Shoes",
        name: "Astro Turf Legend Shoes",
        description: "Classic turf shoes engineered with a specialized rubber outsole for synthetic surfaces.",
        price: 85,
        image: ["https://plescon.sm.mncdn.com/mnresize/480/-/lescon/upload/urunler/26BAE0ARAREG_003_1.jpg"],
        Category: "Men",
        subCategory: "Footwear",
        sizes: ["7", "8", "9", "10", "11"],
        bestseller: true,
        date: 1716634345457,
        salePrice: null,
        onSale: false,
        featured: false,
        earlyAccess: false,
        memberPrice: 75
    },
    {
        _id: "New_Balance_9060_Shoes",
        name: "New Balance 9060 Shoes",
        description: "Retro-inspired running shoes with a cushioned midsole and durable rubber outsole for everyday wear.",
        price: 160,
        image: ["https://nb.scene7.com/is/image/NB/u9060jbb_nb_02_i?$pdpflexf2$&wid=440&hei=440"],
        Category: "Men",
        subCategory: "Footwear",
        sizes: ["7", "8", "9", "10", "11", "12"],
        bestseller: true,
        date: Date.now(),
        salePrice: null,
        onSale: false,
        featured: true,
        earlyAccess: false,
        memberPrice: 150
    }
];