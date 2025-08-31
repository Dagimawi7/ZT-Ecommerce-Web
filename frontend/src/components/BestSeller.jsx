import React from 'react'
// Import ShopContext to get access to products
import { ShopContext } from '../context/ShopContext';
// Import a custom Title component (for section heading)
import Title from './Title';
import { useContext, useState, useEffect } from 'react';
// Import ProductItem component (shows one product's info)
import ProductItem from './productItem';


const BestSeller = () => {
  // Gets products from ShopContext
  const {products} = useContext(ShopContext);
  // state to store the best seller products
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(()=> {
    // Filters only products that have bestseller = true
    const bestProduct = products.filter((item)=>(item.bestseller));
    // Takes only the first 5 best sellers
    setBestSeller(bestProduct.slice(0,5))
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




    </div>
  )
}

export default BestSeller
