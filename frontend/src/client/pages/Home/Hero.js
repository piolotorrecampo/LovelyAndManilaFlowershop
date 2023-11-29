import React from 'react';
import Button from '../../components/Button'

const Hero = () => {
  return (
    <div className="bg-center bg-cover bg-no-repeat bg-hero-img">
      <div className="mx-40 w-auto py-32 gap-8 flex flex-col text-white">
        <div className="w-3/5 sm:4/5 flex flex-col gap-4">
          <h1 className="text-6xl sm:text-5xl">
            Unleash the Magic of AI to Discover Your Perfect Flower!
          </h1>
          <p className="text-2xl sm:text-xl">
            Simply click the button below to explore a world of blossoms with our
            cutting-edge image recognition technology.
          </p>
        </div>
        <div className="">
          <Button to='/ai-finder' title="AI-Finder" />
        </div>
      </div>
    </div>
    
  )
}

export default Hero;