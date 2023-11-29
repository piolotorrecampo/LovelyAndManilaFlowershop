import React, { useState, useContext } from 'react';
import DataContext from '../../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Navbar = () => {
  const { flowers, ocassions, items } = useContext(DataContext);
  const flowerTitles = flowers.map(flower => flower.title);
  const occasionTitles = ocassions.map(occasion => occasion.title);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="flex justify-center gap-14 text-sm items-center w-full h-9 text-foreground bg-background">
      <NavLink to="/">HOME</NavLink>
      <NavMenuDropdown title="FLOWERS" items={flowerTitles} />
      <NavMenuDropdown title="OCASSIONS" items={occasionTitles} />
      <NavLink to="/ai-finder">AI-FINDER</NavLink>
      <NavLink to="/about-us">ABOUT US</NavLink>
      <NavLink to="/contact">CONTACT</NavLink>
      <div className='flex gap-3'>
        <NavLink to="/quick-finder"><SearchIcon/></NavLink>
        <div>
          <NavLink to="/my-cart"><ShoppingCartOutlinedIcon/></NavLink>
          <span className=''>({totalQuantity})</span>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar

const NavMenuDropdown = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const items = props.items

  return (
    <div
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
      className="relative group"
    >
      <NavLink href="/services" className="text-white">
        {props.title}
      </NavLink>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-2 py-2 bg-white text-black border rounded-lg space-y-2 group-hover:block"
          >
            {items.map((items) => (
              <Link to={`/products/${items}`} className="block px-4 py-2">
                <p className='capitaize'>{items}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
