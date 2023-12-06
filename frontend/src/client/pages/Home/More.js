import React from 'react'
import Button from '../../components/Button'

const More = () => {
  return (
    <div className="bg-more-img bg-cover bg-no-repeat bg-center">
      <div className="lg:mx-40 md:mx-20 p-16 flex gap-8 flex-col justify-content items-center">
        <h3 className="text-xl text-center text-white">
          "Brighten your world with the elegance of our flower arrangements; each
          bloom tells a story of beauty and emotion. Let our creations bring a
          touch of nature's wonder into your life."
        </h3>
        <Button to='/quick-finder' title="More Flowers" />
      </div>
    </div> 
  )
}

export default More