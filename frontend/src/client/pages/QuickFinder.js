import React, { useState, useContext } from 'react'
import DataContext from '../../context/DataContext';

import Footer from '../components/Footer'
import Filterbar from '../components/Filterbar'
import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import FlowerCard from '../components/FlowerCard';


const QuickFinder = () => {
  
  const { products } = useContext(DataContext);
  const [filteredProducts, setFilteredProducts] = useState(products);

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
          title="Quick Finder"
          page="quick-finder"
        />
        <div className="lg:mx-40 md:mx-20 sm:mx-4 xs:mx-4 py-16 gap-10 flex flex-col items-center">
          <h1 className="text-5xl">Quick Finder</h1>
          <p className="text-center">
            Quick Finder is your ultimate tool for effortlessly narrowing down our
            vast selection of stunning flower products. Say goodbye to the
            frustration of scrolling through endless options and hello to a
            seamless and tailored floral shopping experience.
          </p>
          <Filterbar />
        </div>
        <div>
          <Footer />
        </div>
    </div>
  )
}

export default QuickFinder
