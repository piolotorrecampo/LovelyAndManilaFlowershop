import React, { useState } from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import OcassionSection from './OcassionSection'
import CategorySection from './CategorySection'
import ProductSection from './ProductSection'
import FlowerSection from './FlowerSection'

const Products = () => {
  return (
    <div>
      <div>
        <NavbarAdmin />
      </div>
      <div>
        <CrudForms />
      </div>
    </div>
  )
}

export default Products

const CrudForms = () => {
  const [isCategorySelected, setIsCategorySelected] = useState(false)
  const [isOcassionSelected, setIsOcassionSelected] = useState(false)
  const [isProductSelected, setIsProductSelected] = useState(true)
  const [isFlowerSelected, setIsFlowerSelected] = useState(false)

  function handleClick(value) {
    if (value === 'category') {
      setIsCategorySelected(true)
      setIsOcassionSelected(false)
      setIsProductSelected(false)
      setIsFlowerSelected(false)
    } else if (value === 'ocassion') {
      setIsCategorySelected(false)
      setIsOcassionSelected(true)
      setIsProductSelected(false)
      setIsFlowerSelected(false)
    } else if (value === 'product') {
      setIsCategorySelected(false)
      setIsOcassionSelected(false)
      setIsProductSelected(true)
      setIsFlowerSelected(false)
    } else if (value === 'flower') {
      setIsCategorySelected(false)
      setIsOcassionSelected(false)
      setIsProductSelected(false)
      setIsFlowerSelected(true)
    } else {
      setIsCategorySelected(false)
      setIsOcassionSelected(false)
      setIsProductSelected(false)
      setIsFlowerSelected(false)
    }
  }

  return (
    <div>
      <div className="w-full gap-10 flex flex-row h-9 bg-topbanner justify-center items-center ">
        <button onClick={() => handleClick('product')}>Product</button>
        <button onClick={() => handleClick('ocassion')}>Ocassion</button>       
        <button onClick={() => handleClick('category')}>Category</button>
        <button onClick={() => handleClick('flower')}>Flower</button>
      </div>

      {isOcassionSelected && ( <OcassionSection pageName='Ocassions' api='ocassion' /> )}
      {isProductSelected && ( <ProductSection pageName='Products' api='product' /> )}
      {isFlowerSelected && ( <FlowerSection pageName='Flowers' api='flower' /> )}
      {isCategorySelected && ( <CategorySection  pageName='Categories' api='ocassion' /> )}
    </div>
  )
}

