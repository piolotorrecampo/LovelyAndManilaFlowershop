import React from 'react';
import FlowerCard from '../../components/FlowerCard';

const Flowers = (props) => {
  const list = props.list

  return (
    <div className="lg:mx-40 md:mx-20 xs:mx-4 py-16 flex flex-col justify-center items-center gap-10">
      <h1 className="text-6xl xs:text-5xl text-center text-black">FEATURED FLOWERS</h1>
      <div className='flex flex-row flex-wrap justify-center align-center gap-5'>
        {list && list.map((item) => (
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
    </div>
  )
}

export default Flowers;