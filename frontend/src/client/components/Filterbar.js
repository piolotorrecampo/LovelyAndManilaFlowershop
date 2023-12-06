import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CustomLink from './CustomLink';
import DataContext from '../../context/DataContext';
import FlowerCard from './FlowerCard';

const Filterbar = () => {
  const [filters, setFilters] = useState({
    occasion: 'Select ocassion',
    flowerType: 'Select type',
    price: 'Select price',
    category: 'Select category',
  });

  const { flowers, ocassions, categories, products } = useContext(DataContext);
  const flowerTitles = flowers.map(flower => flower.title);
  const occasionTitles = ocassions.map(occasion => occasion.title);
  const categoriesTitles = categories.map(category => category.title);
  const prices = ['0-499', '500-1000', '1000 and above'];

  const [filteredProducts, setFilteredProducts] = useState(products); 

  useEffect(() => {
    const filtered = products.filter((product) => {
      // Filter Occasions
      const ocassionFilter = filters.occasion === 'Select ocassion' || product.ocassion.includes(filters.occasion);

      // Filter by price range
      let priceFilter = true;
      if (filters.price !== 'Select price') {
        const [minPrice, maxPrice] = filters.price.split('-');
        const productPrice = parseFloat(product.price);

        if (minPrice && maxPrice) {
          priceFilter = productPrice >= parseFloat(minPrice) && productPrice <= parseFloat(maxPrice);
        } else if (minPrice) {
          priceFilter = productPrice >= parseFloat(minPrice);
        } else if (maxPrice) {
          priceFilter = productPrice <= parseFloat(maxPrice);
        }
      }
  
      // Filter by flower type
      const flowerTypeFilter =
        filters.flowerType === 'Select type' || product.flowerType === filters.flowerType;
  
      // Filter by category
      const categoryFilter =
        filters.category === 'Select category' || product.category === filters.category;
  
      // Combine all filters
      return ocassionFilter && flowerTypeFilter && categoryFilter && priceFilter;
    });
  
    setFilteredProducts(filtered);
  }, [products, filters]);

  console.log(filters);
  console.log(filteredProducts);
  
  return (
    <div className='flex flex-col justify-center gap-10'>
      <form className="">
        <nav className="py-4 rounded shadow-lg flex lg:flex-row md:flex-row justify-center gap-5 text-sm items-center h-auto text-black border border-black-500 sm:flex-col xs:flex-col">
          <div className="flex flex-col gap-1 justify-center items-center w-32">
            <label className="font-bold">Flowers</label>
            <DropdownMenu
              title="Select a flower"
              items={flowerTitles}
              selectedValue={filters.flowerType} // Corrected the selectedValue
              onSelect={(value) => setFilters({ ...filters, flowerType: value })} // Updated the onSelect
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center w-32">
            <label className="font-bold">Ocassion</label>
            <DropdownMenu
              title="Select an ocassion"
              items={occasionTitles}
              selectedValue={filters.occasion} // Corrected the selectedValue
              onSelect={(value) => setFilters({ ...filters, occasion: value })} 
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center w-32">
            <label className="font-bold">Category</label>
            <DropdownMenu
              title="Select a category"
              items={categoriesTitles}
              selectedValue={filters.category}
              onSelect={(value) => setFilters({ ...filters, category: value })}
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center w-32">
            <label className="font-bold">Price</label>
            <DropdownMenu
              title="Select a price"
              items={prices}
              selectedValue={filters.price}
              onSelect={(value) => setFilters({ ...filters, price: value })} 
            />
          </div>
        </nav>
      </form>
      <div className='flex flex-row flex-wrap justify-center gap-3'>
        {filteredProducts && filteredProducts.map((item) => (
          <FlowerCard 
            image={item.image.url}
            title={item.title}
            price={item.price}
            alt='flower'
            id={item._id}
            to={`/product/${item._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Filterbar;

const DropdownMenu = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdownOn = () => {
    setIsDropdownOpen(true)
  }
  const toggleDropdownOff = () => {
    setIsDropdownOpen(false)
  }
  const handleClick = (value) => {
    props.onSelect(value)
  }
  const items = props.items

  return (
    <div
      onMouseEnter={toggleDropdownOn}
      onMouseLeave={toggleDropdownOff}
      className="relative group"
    >
      <CustomLink title={props.selectedValue || props.title} />
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-2 py-2 bg-white text-black border rounded-lg space-y-2 group-hover:block"
          >
            {items.map((item) => (
              <Link
                key={item}
                className={`block px-4 py-2 ${
                  props.selectedValue === item ? 'bg-gray-300' : ''
                }`}
                onClick={() => handleClick(item)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
