import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { Link } from 'react-router-dom';

const OnSale = () => {
    const { products, currency } = useContext(ShopContext);
    const [saleProducts, setSaleProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setSaleProducts(products.filter(item => item.onSale).slice(0, 4));
        }
    }, [products]);

    if (saleProducts.length === 0) return null;

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl flex items-center justify-center gap-2'>
                <span className='text-red-500'>🔥</span>
                <Title text1={'ON'} text2={'SALE'} />
                <span className='text-red-500'>🔥</span>
            </div>
            <p className='text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8'>
                Grab these limited time deals before they're gone!
            </p>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {saleProducts.map((item, index) => {
                    const discountPercent = Math.round((1 - (item.salePrice / item.price)) * 100);

                    return (
                        <Link key={index} className='text-gray-700 cursor-pointer group' to={`/product/${item._id}`}>
                            <div className='overflow-hidden relative'>
                                <div className='absolute top-2 right-2 z-10 bg-red-500 text-white text-[10px] px-2 py-1 font-bold tracking-wider rounded-sm shadow-md'>
                                    {discountPercent}% OFF
                                </div>
                                <img className='group-hover:scale-110 transition ease-in-out' src={item.image[0]} alt={item.name} />
                            </div>
                            <p className='pt-3 pb-1 text-sm'>{item.name}</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-sm font-bold text-red-500'>{currency}{item.salePrice}</p>
                                <p className='text-xs text-gray-400 line-through'>{currency}{item.price}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default OnSale;
