import React from 'react';
import Button from '../../components/Button'

const Hero = () => {
  return (
    <div className="bg-center bg-cover bg-no-repeat bg-hero-img">
      <div className="lg:mx-40 md:mx-20 xs:mx-4 w-auto py-32 gap-8 flex flex-col text-white xs:justify-center xs:items-center">
        <div className="lg:w-3/5 xs:4/5 flex flex-col gap-4">
          <h1 className="text-6xl xs:text-4xl xs:text-center">
            Unleash the Magic of AI to Discover Your Perfect Flower!
          </h1>
          <p className="text-2xl xs:text-xl xs:text-center">
            Simply click the button below to explore a world of blossoms with our
            cutting-edge image recognition technology.
          </p>
        </div>
        <div className="">
          <Button to='/ai-finder' title="AI-Finder" />
        </div>
      </div>
    </div>
  );
};

export default Hero;