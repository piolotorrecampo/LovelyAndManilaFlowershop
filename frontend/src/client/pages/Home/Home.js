import React, { useContext } from 'react'
import DataContext from '../../../context/DataContext';

import Hero from './Hero';
import Ocassions from './Ocassions';
import Map from '../../components/Map';
import Flowers from './Flowers';
import More from './More';
import RecentBlogs from './RecentBlogs';

import TopBanner from '../../components/Header/TopBanner';
import LogoBanner from '../../components/Header/LogoBanner';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer';

const Home = () => {

  const { products, ocassions } = useContext(DataContext);
  products.sort((a, b) => b.timestamp - a.timestamp);
  const recentObjects = products.slice(0, 5);

  return (
    <div>
      <div className='sticky top-0'>
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
      <Hero/>
      <Ocassions
        list={ocassions}
      />
      <Map/>
      <Flowers
        list={recentObjects}
      />
      <More/>
      <RecentBlogs/>
      <Footer />
    </div>
  )
}

export default Home

