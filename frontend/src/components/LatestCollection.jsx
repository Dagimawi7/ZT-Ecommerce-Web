import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const LatestCollection = () => {
    // Get the products data from ShopContext
    const { products } = useContext(ShopContext);
     // Just to check: print the products in the console
    console.log(products)

  return (
    <div>
      {/* Products will be displayed here later */}
    </div>
  )
}

export default LatestCollection
