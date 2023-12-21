import React, {useEffect, useState, useContext} from 'react'

import { useParams } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { UpdateAddToCart } from '../../FetchData';

import Button from '../components/Button'
import Footer from '../components/Footer'

import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';

const FlowerDetails = () => {
  const { identifier } = useParams();
  const [details, setDetails] = useState('');  
  const { addToCart } = useContext(DataContext);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/product/${identifier}`);
      if (res.ok) {
        const json = await res.json();
        setDetails(json);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = () => {
    UpdateAddToCart(details._id);
    addToCart(details._id, details.title, details.flowerType, details.price, details.description, details.ocassion, details.category, details.image.url);
  }

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
        title={details.title}
        page="product"
      />
      <div className="lg:mx-40 md:mx-20 sm:mx-4 xs:mx-4 py-10 flex flex-col justify-center items-center gap-10">
          <div className="flex lg:flex-row md:flex-row justify-center align-center gap-10 xs:flex-col sm:flex-col ">
            {details.image && (
              <img className='w-96 h-96 object-cover overflow-hidden' alt='flowers'
                src={details.image.url}
              />
            )}
            <div className="flex flex-col p-1 gap-3 w-2/3 xs:w-full sm:w-full xs:gap-9 sm:gap-9 sm:justify-center sm:items-center xs:justify-center xs:items-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl">{details.title}</h1>
                  <p className="text-md">₱ {details.price}</p>
                </div>
                <p className="text-lg">{details.description}</p>
              </div>
              <div className='flex justify-items-center gap-5'>
                <Button onClick={handleClick} title='Add to Cart'/>
                <Button to='/my-cart' title='Checkout Now!'/>
              </div>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default FlowerDetails
