import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('credit'); // default = credit
  
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*:::::left side:::::::: */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 w-full' type="text" placeholder='First Name' />
          <input className='border border-gray-300 rounded py-1.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 w-full' type="email" placeholder='Email Address' />
        <input className='border border-gray-300 rounded py-1.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 w-full' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 w-full' type="number" placeholder='ZipCode' />
          <input className='border border-gray-300 rounded py-1.5 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/*:::: RightSide::::*/}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/*:::: payment method choice::::*/}
          <div className="flex flex-col gap-3">
            <label onClick={() => setMethod('credit')} className="flex items-center gap-3 border p-3 cursor-pointer rounded">
              <input type="radio" name="payment" value="credit" checked={method === 'credit'} onChange={() => setMethod('credit')}/>
              <img className="h-6" src={assets.credit} alt="Credit or Debit Card" />
              <span>Credit or Debit Card</span>
            </label>

            <label onClick={() => setMethod('paypal')} className="flex items-center gap-3 border p-3 cursor-pointer rounded">
              <input type="radio" name="payment" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')}/>
              <img className="h-6" src={assets.paypal} alt="PayPal" />
              <span>PayPal</span>
            </label>

            <label onClick={() => setMethod('klarna')} className="flex items-center gap-3 border p-3 cursor-pointer rounded">
              <input type="radio" name="payment" value="klarna" checked={method === 'klarna'} onChange={() => setMethod('klarna')}/>
              <img className="h-6" src={assets.klarna} alt="Klarna" />
              <span>Klarna</span>
            </label>

            <label onClick={() => setMethod('Google pay')} className="flex items-center gap-3 border p-3 cursor-pointer rounded">
              <input type="radio" name="payment" value="google" checked={method === 'google'} onChange={() => setMethod('google')}/>
              <img className="h-6" src={assets.google} alt="Google Pay" />
              <span>Google Pay</span>
            </label>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
