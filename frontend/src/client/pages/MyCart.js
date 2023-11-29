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
          leftContent="+63 123 123 1234"
          centerContent="Open at 7 am to 10 pm"
          rightContent="example@gmail.com"
        />
      </div>  
    <LogoBanner />
      <div className='sticky top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title="My Cart"
        page="my-cart"
      />
      <div className='mx-40 py-16 flex flex-col justify-center items-center '>
        <h1 className='text-6xl pb-10'>My Cart</h1>
        {items && items.map((item) => (
          <div className='my-1 p-5 items-center flex border gap-5'>
            <img
              className='h-20 w-20 object-cover'
              src={item.imageUrl}
              alt='flower'
            />
            <p>{item.title}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
            <button onClick={() => removeFromCart(item.productId)}><DeleteOutlineIcon/></button>
          </div>
        ))}
        <form className='flex flex-col gap-3'>
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
      <Footer />
    </div>
  )
}

export default MyCart
