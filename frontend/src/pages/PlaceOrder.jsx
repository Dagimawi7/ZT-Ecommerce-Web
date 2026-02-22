import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('COD'); // Changed default to COD for testing

  const { navigate, backendUrl, token, cartItems, getCartSubtotal, discountData, isMember, delivery_fee, promoCode, setCartItems } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            orderItems.push({
              id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const subtotal = getCartSubtotal();
      const discount = discountData?.discount || 0;
      const processingSubtotal = Math.max(0, subtotal - discount);
      const tax = processingSubtotal > 0 ? (processingSubtotal * 0.08) : 0;
      const totalAmount = processingSubtotal + tax + delivery_fee;

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,
        subtotal: subtotal,
        promoCode: promoCode || null,
        discount: discount,
        tax: tax
      }

      switch (method) {
        case 'COD':
          const response = await fetch(`${backendUrl}/api/order/place`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', token },
            body: JSON.stringify(orderData)
          });
          const data = await response.json();
          if (data.success) {
            setCartItems({});
            navigate('/orders');
            toast.success("Order placed successfully!");
          } else {
            toast.error(data.message);
          }
          break;
        default:
          toast.info("Only COD is supported in this demo");
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*:::::left side:::::::: */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='ZipCode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
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
            <label onClick={() => setMethod('credit')} className={`flex items-center gap-3 border p-3 cursor-pointer rounded ${method === 'credit' ? 'border-green-400' : ''}`}>
              <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'credit' ? 'bg-green-400' : ''}`}></div>
              <img className="h-6" src={assets.credit} alt="Credit or Debit Card" />
              <span>Credit or Debit Card</span>
            </label>

            <label onClick={() => setMethod('COD')} className={`flex items-center gap-3 border p-3 cursor-pointer rounded ${method === 'COD' ? 'border-green-400' : ''}`}>
              <div className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></div>
              <span className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</span>
            </label>

            <label onClick={() => setMethod('paypal')} className="flex items-center gap-3 border p-3 cursor-pointer rounded">
              <input type="radio" name="payment" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')} />
              <img className="h-6" src={assets.paypal} alt="PayPal" />
              <span>PayPal</span>
            </label>

            <label onClick={() => setMethod('klarna')} className="flex items-center gap-3 border p-3 cursor-pointer rounded">
              <input type="radio" name="payment" value="klarna" checked={method === 'klarna'} onChange={() => setMethod('klarna')} />
              <img className="h-6" src={assets.klarna} alt="Klarna" />
              <span>Klarna</span>
            </label>

          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
