import React from 'react'
// Import ShopContext to get access to products
import { ShopContext } from '../context/ShopContext';
// Import a custom Title component (for section heading)
import Title from './Title';
import { useContext, useState, useEffect } from 'react';
// Import ProductItem component (shows one product's info)
import ProductItem from "../components/ProductItem";


const BestSeller = () => {
  // Gets products from ShopContext
  const {products} = useContext(ShopContext);
  // state to store the best seller products
  const [bestSeller, setBestSeller] = useState([]);

  // state to store which button version user gets (A or B)
  const [buttonVariant, setButtonVariant] = useState('A');


  useEffect(()=> {
    // Filters only products that have bestseller = true
    const bestProduct = products.filter((item)=>(item.bestseller));
    // Takes only the first 5 best sellers
    setBestSeller(bestProduct.slice(0,5))
    
    // coin flip logic to determine which button version the user gets (A or B)
    const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
    setButtonVariant(randomVariant);
  }, [])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorep Ipsum is slogkahdlafhadlfahkdflahdfa dajhdfk kadfaldf 
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSeller.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))
        }
      </div>

      {/* A/B Test Button */}
      <div className='text-center mt-10'>
        <button 
          className={
            buttonVariant === 'A' 
              ? "bg-black text-white px-8 py-3 text-sm active:bg-gray-700" 
              : "border border-black text-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all"
          }
          onClick={() => console.log(`A/B Test: User clicked variant ${buttonVariant}`)}
        >
          View All Best Sellers
        </button>
      </div>



    </div>
  )
}

export default BestSeller
