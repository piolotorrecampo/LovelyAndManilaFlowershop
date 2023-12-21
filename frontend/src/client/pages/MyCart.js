import React, { useState, useContext } from 'react';
import { AddOrder } from '../../FetchData';
import DataContext from '../../context/DataContext';

import Button from '../components/Button';
import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import Footer from '../components/Footer';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MyCart = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { items, removeFromCart, emptyCart } = useContext(DataContext);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const convertedItems = items.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const orderData = {
    customerName: name,
    phoneNumber: phoneNumber,
    email: email,
    order: convertedItems,
    pickupDate: pickupDate,
    message: message,
    state: 'pending',
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orders = orderData
    console.log(orders);
    setLoading(true);
  
    try {
      const res = await AddOrder(orders);
      console.log(res);
      alert('added');
      setName('');
      setPhoneNumber('');
      setEmail('');
      setMessage('');
      emptyCart();
    } catch (error) {
      setError(error);
      console.error('Error:', error);
    }
    setLoading(false)
  };
  
  return (
    <div>
      <div className='sticky top-0 w-full'>
        <TopBanner
          leftContent="+63 917 3277 116"
          centerContent="Open at 6 am to 8 pm"
          rightContent="manilaflowershop@yahoo.com"
        />
      </div>  
    <LogoBanner />
      <div className='lg:sticky lg:top-8 md:sticky md:top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title="My Cart"
        page="my-cart"
      />
      <div className='lg:mx-40 sm:mx-4 xs:mx-4 md:mx-20 py-16 flex flex-col justify-center gap-5'>
        <h1 className='text-6xl text-center'>My Cart</h1>
        <div>
          {items ? items.map((item) => (
            <div className='my-1 p-2 justify-between items-center flex border gap-3'>
              <img
                className='h-20 w-20 object-cover'
                src={item.imageUrl}
                alt='flower'
              />
              <p>{item.title}</p>
              <p>{item.quantity}</p>
              <p>{item.price}</p>
              <button className='px-10' onClick={() => removeFromCart(item.productId)}><DeleteOutlineIcon/></button>
            </div>
          )) : 
            <div>
              <p className='text-center'>No added products.</p>
            </div>
          }
        </div>
        {totalPrice > 0 ?
          <div className='flex flex-row justify-center items-center gap-3'>
            <p>Total Price: </p>
            <p>{totalPrice}</p>
          </div>
        : 
          <div className='flex flex-row justify-center items-center gap-3'>
            <p>Your cart is empty.</p>
          </div>
        }
        <div className='flex flex-col gap-5 justify-center items-center'>
          <h1 className='text-5xl'>Checkout</h1>
          <form className='flex flex-col gap-3 lg:w-96 md:w-96 sm:w-4/5 xs:w-4/5'>
            <div className='flex flex-col'>
              <label className='font-bold'>Name</label>
              <input className='border' type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className='flex flex-col'>
              <label className='font-bold'>Phone Number</label>
              <input className='border' type="text" id='name' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
            </div>
            <div className='flex flex-col'>
              <label className='font-bold'>Email</label>
              <input className='border' type="email" id='name' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Date</label>
              < DateTimePicker 
                value={pickupDate} 
                onChange={(value) => setPickupDate(value)}  
                format="yyyy-MM-dd HH:mm"
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Add Custom Message</label>
              <textarea className='border' id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" name="message" cols="50" />
            </div>
            <Button onClick={handleSubmit} title='Checkout'/>
          </form>
        </div>
        {loading && 
          <div>
           <p>loading...</p>
          </div>
        }
        {error && 
          <div>
            {error}
          </div>
        }
      </div>      
      <Footer />
    </div>
  )
}

export default MyCart
