import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartSubtotal, discountData, isMember } = useContext(ShopContext);

    const subtotal = getCartSubtotal();
    const discountAmount = discountData?.discount || 0;
    const processingSubtotal = Math.max(0, subtotal - discountAmount);

    // Calculate 8% tax
    const taxAmount = subtotal > 0 ? (processingSubtotal * 0.08) : 0;

    const finalTotal = subtotal === 0 ? 0 : (processingSubtotal + taxAmount + delivery_fee);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal.toFixed(2)}</p>
                </div>

                {discountAmount > 0 && (
                    <>
                        <hr />
                        <div className='flex justify-between text-green-600'>
                            <p>Discount applied</p>
                            <p>-{currency} {discountAmount.toFixed(2)}</p>
                        </div>
                    </>
                )}

                <hr />
                <div className='flex justify-between'>
                    <p>Tax (8%)</p>
                    <p>{currency} {taxAmount.toFixed(2)}</p>
                </div>

                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{isMember ? <span className="text-green-600 font-medium">FREE (Member)</span> : `${currency} ${delivery_fee.toFixed(2)}`}</p>
                </div>

                <hr />
                <div className='flex justify-between text-base md:text-lg'>
                    <b>Total</b>
                    <b>{currency} {finalTotal.toFixed(2)}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
