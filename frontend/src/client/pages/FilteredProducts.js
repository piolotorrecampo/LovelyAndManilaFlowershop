import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../../context/DataContext';

import TopBanner from '../components/Header/TopBanner';
import LogoBanner from '../components/Header/LogoBanner';
import Navbar from '../components/Header/Navbar';
import SubBanner from '../components/Header/SubBanner';
import Footer from '../components/Footer'
import FlowerCard from '../components/FlowerCard';

function FilteredProducts(props) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { identifier } = useParams();
  const { products } = useContext(DataContext);

  useEffect(() => {
    const filteredOcassions = products.filter((product) => product.ocassion.includes(identifier));
    const filteredFlowerType = products.filter((product) => product.flowerType === identifier);

    if (filteredOcassions.length > 0) {
      setFilteredProducts(filteredOcassions);
    } else {
      setFilteredProducts(filteredFlowerType); 
    }
    
  }, [products, identifier]);

  console.log(filteredProducts);

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
      <div className='sticky top-8'>
        <Navbar />
      </div>
      <SubBanner 
        title={identifier}
        page={identifier}
      />
      <div className='flex flex-row flex-wrap justify-center align-center w-auto mx-40 my-16 gap-5'>
        {filteredProducts && filteredProducts.map((item) => (
        <div>
          <FlowerCard 
            image={item.image.url}
            title={item.title}
            price={item.price}
            alt='flower'
            id={item._id}
            to={`/product/${item._id}`}
          />
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default FilteredProducts
