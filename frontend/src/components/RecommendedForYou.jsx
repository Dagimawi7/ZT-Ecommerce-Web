import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RecommendedForYou = () => {
    const { products } = useContext(ShopContext);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        // Simple recommendation logic: grab 4 random products from the catalog
        if (products.length > 0) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRecommended(shuffled.slice(0, 4));
        }
    }, [products]);

    if (recommended.length === 0) return null;

    return (
        <div className='my-10 bg-gray-50 py-10 px-4 sm:px-10 rounded-lg border border-gray-100'>
            <div className='text-left mb-8'>
                <h3 className='text-2xl font-medium'>Recommended For You</h3>
                <p className='text-gray-500 text-sm mt-1'>Based on what's trending right now</p>
                <hr className='w-16 border-none h-1 bg-black mt-4' />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 gap-y-6'>
                {recommended.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedForYou;
