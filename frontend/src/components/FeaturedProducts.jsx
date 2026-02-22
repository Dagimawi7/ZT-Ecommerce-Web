import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const FeaturedProducts = () => {
    const { backendUrl } = useContext(ShopContext);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/product/featured`);
                const data = await response.json();
                if (data.success) {
                    setFeaturedProducts(data.products.slice(0, 4)); // Get top 4
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchFeatured();
    }, [backendUrl]);

    if (featuredProducts.length === 0) return null;

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'FEATURED'} text2={'PRODUCTS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Handpicked premium selections for our top customers.
                </p>
            </div>

            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {featuredProducts.map((item, index) => (
                    <div key={index} className='relative'>
                        <div className='absolute top-2 left-2 z-10 bg-black text-white text-[10px] px-2 py-1 font-bold tracking-wider'>
                            FEATURED
                        </div>
                        <ProductItem
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
